import { Component, ViewChild } from '@angular/core';
import { EmpresaModel } from '../models/empresa.model';
import { AddEmpresa, DeleteEmpresa, GetEmpresa, UpdateEmpresa } from '../state-management/empresa/empresa-action';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import { EmpresasState } from '../state-management/empresa/empresa.state';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.scss']
})
export class GestionEmpresasComponent {
  empresa: EmpresaModel = {
    idEmpresa: 0,
    nombre: '',
    direccion: '',
    nit: '',
    telefono: ''
  };
  
  agregarEmpresa() {
    this.store.dispatch(new AddEmpresa(this.empresa));
    this.empresa = {
      idEmpresa: 0,
      nombre: '',
      direccion: '',
      nit: '',
      telefono: ''
    };
  }
  
  eliminarEmpresa(id: number) {
    this.store.dispatch(new DeleteEmpresa(id));
  }
  
  actualizarEmpresa(empresa: EmpresaModel) {    
    this.store.dispatch(new UpdateEmpresa(this.empresa));
  }
  
  empresas$: Observable<EmpresaModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  
  displayedColumns: string[] = ['select', 'nombre', 'direccion', 'nit', 'telefono', 'accion'];
  dataSource: MatTableDataSource<EmpresaModel> = new MatTableDataSource(); 
  selection = new SelectionModel<EmpresaModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store) {
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  ngOnInit(): void {
    // Despacha la acción para obtener las empresas
    this.store.dispatch(new GetEmpresa());
  
    // Suscríbete al observable para actualizar el dataSource
    this.empresas$.subscribe((empresas) => {
      this.dataSource.data = empresas; // Asigna los datos al dataSource
    });
  }
  
}
