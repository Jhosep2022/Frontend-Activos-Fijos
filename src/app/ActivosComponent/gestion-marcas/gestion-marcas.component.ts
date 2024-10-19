import { Component, ViewChild } from '@angular/core';
import { MarcaModel } from '../models/marca.model';
import { AddMarca, DeleteMarca, GetMarca, UpdateMarca } from '../state-management/marca/marca.action';
import { MarcaState } from '../state-management/marca/marca.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PdfreportService } from '../services/reportes/pdfreport.service';

@Component({
  selector: 'app-gestion-marcas',
  templateUrl: './gestion-marcas.component.html',
  styleUrls: ['./gestion-marcas.component.scss']
})
export class GestionMarcasComponent {
  marca: MarcaModel = {
    idMarca: 0,
    nombre: '',
    paisOrigen: '',
    descripcion: '',
    estado: false
  };
  
  agregarMarca() {
    this.store.dispatch(new AddMarca(this.marca));
    this.marca = {
      idMarca: 0,
      nombre: '',
      paisOrigen: '',
      descripcion: '',
      estado: false
    };
  }
  
  eliminarMarca(id: number) {
    this.store.dispatch(new DeleteMarca(id));
  }
  
  actualizarMarca(marca: MarcaModel) {    
    this.store.dispatch(new UpdateMarca(this.marca));
  }
  
  marcas$: Observable<MarcaModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  
  displayedColumns: string[] = ['select', 'nombre', 'descripcion', 'origen', 'accion'];
  dataSource: MatTableDataSource<MarcaModel> = new MatTableDataSource(); 
  selection = new SelectionModel<MarcaModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store, public pdfreportService: PdfreportService) {
    this.marcas$ = this.store.select(MarcaState.getMarcas);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const marcasSeleccionados = this.selection.selected;
    this.pdfreportService.marcaspdf(marcasSeleccionados);
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
    // Despacha la acción para obtener las marcas
    this.store.dispatch(new GetMarca());
  
    // Suscríbete al observable para actualizar el dataSource
    this.marcas$.subscribe((marcas) => {
      this.dataSource.data = marcas; // Asigna los datos al dataSource
    });
  }
  
}
