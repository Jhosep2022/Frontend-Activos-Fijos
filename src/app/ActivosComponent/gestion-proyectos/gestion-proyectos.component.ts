import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ProyectoModel, ProyectoStringModel } from '../models/proyecto.model';
import { AddProyecto, DeleteProyecto, GetProyecto, UpdateProyecto } from '../state-management/proyecto/proyecto.action';
import { map, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProyectoState } from '../state-management/proyecto/proyecto.state';
import { AreaModel } from '../models/area.model';
import { AreasState } from '../state-management/area/area.state';
import { DatePipe } from '@angular/common';
import { GetArea } from '../state-management/area/area.action';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';
import { CsvreportService } from '../services/reportes/csvreport.service';

@Component({
  selector: 'app-gestion-proyectos',
  templateUrl: './gestion-proyectos.component.html',
  styleUrls: ['./gestion-proyectos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class GestionProyectosComponent implements AfterViewInit {
  areas$: Observable<AreaModel[]>; // Observable que contiene los roles
  areas: AreaModel[] = [];
  proyecto: ProyectoModel = {
    idProyecto: 0,
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    idArea: 0,
    codigoProyecto: ''
  };

  obtenerIniciales(texto: string): string {
    if (!texto) return "A";
  
    // Palabras que se deben excluir
    const palabrasExcluidas = ["de", "la"];
  
    // Dividir el texto en palabras
    const palabras = texto
      .toLowerCase()
      .split(" ")
      .filter(palabra => !palabrasExcluidas.includes(palabra));
  
    // Obtener las primeras letras de las primeras 4 palabras válidas
    const iniciales = palabras
      .slice(0, 4)
      .map(palabra => palabra[0].toUpperCase());
  
    // Completar con "A" si hay menos de 4 palabras válidas
    while (iniciales.length < 4) {
      iniciales.push("A");
    }
  
    // Unir las iniciales y devolver
    return iniciales.join("");
  }

  agregarProyecto() {
    this.proyecto.codigoProyecto = this.obtenerIniciales(this.proyecto.nombre);
    this.store.dispatch(new AddProyecto(this.proyecto)).subscribe({
      next: () => {
        console.log('Proyecto Registrado exitosamente');
        this.openSnackBar('Proyecto Registrado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al Registrar Proyecto:', error);
        this.openSnackBar('El Proyecto no se pudo Registrar', 'Cerrar');
      }
    });
    this.proyecto = {
      idProyecto: 0,
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      idArea: 0,
      codigoProyecto: ''
    };
  }

  eliminarProyecto(id: number) {
    this.dialogsAccessService.eliminarElemento(id, 'Proyecto');
  }

  actualizarProyecto(proyecto: ProyectoModel) {    
    this.store.dispatch(new UpdateProyecto(this.proyecto));
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  proyectos$: Observable<ProyectoModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    if (this.menuSidebarActive == false) {
      this.menuSidebarActive = true;
    } else {
      this.menuSidebarActive = false;
    }
  }
  //sidebar menu activation end
  displayedColumns: string[] = ['select', 'nombre', 'fechaInicio', 'fechaFin', 'idArea', 'codigoProyecto','accion'];
  dataSource: MatTableDataSource<ProyectoStringModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<ProyectoModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, private datePipe: DatePipe, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public dialogsAccessService: DialogsAccessService, public csvreportService: CsvreportService) {
    this.proyectos$ = this.store.select(ProyectoState.getProyectos);
    this.areas$ = this.store.select(AreasState.getAreas);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Función para obtener el nombre del rol por ID
  getProyectosName(rolId: number): string {
    if (!this.areas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const area = this.areas.find((r) => r.idArea === rolId);
    return area ? area.nombre : 'Sin Areas';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.idRol + 1
    }`;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los roles
    this.store.dispatch([new GetProyecto(), new GetArea()]);

    // Suscríbete al observable para actualizar el dataSource
    this.transformarDatosString().subscribe((proyectos) => {
      this.dataSource.data = proyectos; // Asigna los datos al dataSource
    });

    this.areas$.subscribe((areas) => {
      this.areas = areas;
    });
  }

  generarPDF() {
    const proyectosSeleccionados = this.selection.selected;
    const areas = this.areas$; // Aquí debes asegurarte de que tienes areas correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    areas.subscribe((arealist: AreaModel[]) => {
      this.pdfreportService.proyectopdf(proyectosSeleccionados, arealist);
    });
  }

  generarCSV() {
    const proyectosSeleccionados = this.selection.selected;
    const areas = this.areas$; // Aquí debes asegurarte de que tienes areas correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    areas.subscribe((arealist: AreaModel[]) => {
      this.csvreportService.proyectosCSV(proyectosSeleccionados, arealist);
    });
  }

  transformarDatosString(){
    const listaActual$: Observable<ProyectoModel[]> = this.proyectos$;
    const listaModificada$: Observable<ProyectoStringModel[]> = listaActual$.pipe(
      map((objetos: ProyectoModel[]) =>
        objetos.map((objeto: ProyectoModel) => ({
          idProyecto: objeto.idProyecto,
          nombre: objeto.nombre,
          codigoProyecto: objeto.codigoProyecto,
          fechaInicio: objeto.fechaInicio,
          fechaFin: objeto.fechaFin,
          idArea: objeto.idArea,
          idAreastring: this.getProyectosName(objeto.idArea)
        }))
      )
    );    
    return listaModificada$;
  }

}
