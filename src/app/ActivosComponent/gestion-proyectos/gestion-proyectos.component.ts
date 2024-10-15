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
import { ProyectoModel } from '../models/proyecto.model';
import { AddProyecto, DeleteProyecto, GetProyecto, UpdateProyecto } from '../state-management/proyecto/proyecto.action';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProyectoState } from '../state-management/proyecto/proyecto.state';
import { AreaModel } from '../models/area.model';
import { AreasState } from '../state-management/area/area.state';
import { DatePipe } from '@angular/common';
import { GetArea } from '../state-management/area/area.action';
import { PdfreportService } from '../services/reportes/pdfreport.service';

@Component({
  selector: 'app-gestion-proyectos',
  templateUrl: './gestion-proyectos.component.html',
  styleUrls: ['./gestion-proyectos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class GestionProyectosComponent implements AfterViewInit {
  areas$: Observable<AreaModel[]>; // Observable que contiene los roles
  proyecto: ProyectoModel = {
    idProyecto: 0,
    nombre: '',
      fechaInicio: '',
      fechaFin: '',
    idArea: 0
  };

  agregarProyecto() {
    this.store.dispatch(new AddProyecto(this.proyecto));
    this.proyecto = {
      idProyecto: 0,
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      idArea: 0
    };
  }

  eliminarProyecto(id: number) {
    this.store.dispatch(new DeleteProyecto(id));
  }

  actualizarProyecto(proyecto: ProyectoModel) {    
    this.store.dispatch(new UpdateProyecto(this.proyecto));
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
  displayedColumns: string[] = ['select', 'nombre', 'fechaInicio', 'fechaFin', 'idArea', 'accion'];
  dataSource: MatTableDataSource<ProyectoModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<ProyectoModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, private datePipe: DatePipe, public pdfreportService: PdfreportService) {
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
    this.proyectos$.subscribe((proyectos) => {
      this.dataSource.data = proyectos; // Asigna los datos al dataSource
    });
  }

  generarPDF() {
    const proyectosSeleccionados = this.selection.selected;
    const areas = this.areas$; // Aquí debes asegurarte de que tienes los roles correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    areas.subscribe((arealist: AreaModel[]) => {
      this.pdfreportService.proyectopdf(proyectosSeleccionados, arealist);
    });
  }

}
