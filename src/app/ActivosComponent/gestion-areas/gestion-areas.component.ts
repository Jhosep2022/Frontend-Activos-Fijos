import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AreaModel, AreaStringModel } from '../models/area.model';
import { AddArea, DeleteArea, GetArea, UpdateArea } from '../state-management/area/area.action';
import { AreasState } from '../state-management/area/area.state';
import { EmpresasState } from '../state-management/empresa/empresa.state';
import { EmpresaModel } from '../models/empresa.model';
import { GetEmpresa } from '../state-management/empresa/empresa-action';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';
import { CsvreportService } from '../services/reportes/csvreport.service';

@Component({
  selector: 'app-gestion-areas',
  templateUrl: './gestion-areas.component.html',
  styleUrls: ['./gestion-areas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionAreasComponent implements AfterViewInit  {
  empresas$: Observable<EmpresaModel[]>; // Observable que contiene las empresas
  empresas: EmpresaModel[] = [];
  area: AreaModel = {
    idArea: 0,
    idEmpresa: 1,
    nombre: ''
  };
  
  agregarArea() {
    this.store.dispatch(new AddArea(this.area)).subscribe({
      next: () => {
        console.log('Area Registrado exitosamente');
        this.openSnackBar('Area Registrado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al Registrar Area:', error);
        this.openSnackBar('El Area no se pudo Registrar', 'Cerrar');
      }
    });
    this.area = {
      idArea: 0,
      idEmpresa: 1,
      nombre: ''
    };
  }
  
  eliminarArea(id: number) {
    this.dialogsAccessService.eliminarElemento(id, 'Area');
  }
  
  actualizarArea(area: AreaModel) {    
    this.store.dispatch(new UpdateArea(this.area));
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  
  areas$: Observable<AreaModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  displayedColumns: string[] = ['select', 'nombre', 'empresa', 'accion'];
  dataSource: MatTableDataSource<AreaStringModel> = new MatTableDataSource(); 
  selection = new SelectionModel<AreaModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public dialogsAccessService: DialogsAccessService, public csvreportService: CsvreportService) {
    this.areas$ = this.store.select(AreasState.getAreas);
    this.empresas$ = this.store.select(EmpresasState.getEmpresas);
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
      row.idArea + 1
    }`;
  }

  generarPDF() {
    const areasSeleccionados = this.selection.selected;
    const empresas = this.empresas$; // Aquí debes asegurarte de que tienes los roles correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    empresas.subscribe((empresalist: EmpresaModel[]) => {
      this.pdfreportService.areapdf(areasSeleccionados, empresalist);
    });
  }

  generarCSV() {
    const areasSeleccionados = this.selection.selected;
    const empresas = this.empresas$; // Aquí debes asegurarte de que tienes los roles correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    empresas.subscribe((empresalist: EmpresaModel[]) => {
      this.csvreportService.areasCSV(areasSeleccionados, empresalist);
    });
  }
  
  ngOnInit(): void {
    // Despacha la acción para obtener las áreas
    this.store.dispatch([new GetArea(), new GetEmpresa()]);
  
    // Suscríbete al observable para actualizar el dataSource
    this.transformarDatosString().subscribe((areas) => {
      this.dataSource.data = areas; // Asigna los datos al dataSource
    });

    this.empresas$.subscribe((empresas) => {
      this.empresas = empresas;
    });
  }

  // Función para obtener el nombre del rol por ID
  getEmpresaName(rolId: number): string {
    if (!this.empresas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const empresa = this.empresas.find((r) => r.idEmpresa === rolId);
    return empresa ? empresa.nombre : 'Sin Empresas';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  transformarDatosString(){
    const listaActual$: Observable<AreaModel[]> = this.areas$;
    const listaModificada$: Observable<AreaStringModel[]> = listaActual$.pipe(
      map((objetos: AreaModel[]) =>
        objetos.map((objeto: AreaModel) => ({
          idArea: objeto.idArea,
          idEmpresa: objeto.idEmpresa,
          idEmpresastring: this.getEmpresaName(objeto.idEmpresa),
          nombre: objeto.nombre
        }))
      )
    );    
    return listaModificada$;
  }
  
}
