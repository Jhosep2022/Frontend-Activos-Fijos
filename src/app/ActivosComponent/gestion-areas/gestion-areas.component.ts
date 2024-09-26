import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AreaModel } from '../models/area.model';
import { AddArea, DeleteArea, GetArea, UpdateArea } from '../state-management/area/area.action';
import { AreasState } from '../state-management/area/area.state';
import { EmpresasState } from '../state-management/empresa/empresa.state';
import { EmpresaModel } from '../models/empresa.model';

@Component({
  selector: 'app-gestion-areas',
  templateUrl: './gestion-areas.component.html',
  styleUrls: ['./gestion-areas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionAreasComponent implements AfterViewInit  {
  empresas$: Observable<EmpresaModel[]>; // Observable que contiene las empresas
  area: AreaModel = {
    idArea: 0,
    idEmpresa: 0,
    nombre: ''
  };
  
  agregarArea() {
    this.store.dispatch(new AddArea(this.area));
    this.area = {
      idArea: 0,
      idEmpresa: 0,
      nombre: ''
    };
  }
  
  eliminarArea(id: number) {
    this.store.dispatch(new DeleteArea(id));
  }
  
  actualizarArea(area: AreaModel) {    
    this.store.dispatch(new UpdateArea(this.area));
  }
  
  areas$: Observable<AreaModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  displayedColumns: string[] = ['select', 'nombre', 'empresa', 'accion'];
  dataSource: MatTableDataSource<AreaModel> = new MatTableDataSource(); 
  selection = new SelectionModel<AreaModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store) {
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
  
  ngOnInit(): void {
    // Despacha la acción para obtener las áreas
    this.store.dispatch(new GetArea());
  
    // Suscríbete al observable para actualizar el dataSource
    this.areas$.subscribe((areas) => {
      this.dataSource.data = areas; // Asigna los datos al dataSource
    });
  }
  
}
