import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AddDepreciacion, DeleteDepreciacion, GetDepreciacion, UpdateDepreciacion } from '../state-management/depreciaciones/depreciacion.action';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DepreciacionesModel } from '../models/depreciaciones.model';
import { DepreciacionState } from '../state-management/depreciaciones/depreciacion.state';

@Component({
  selector: 'app-gestion-depreciacion',
  templateUrl: './gestion-depreciacion.component.html',
  styleUrls: ['./gestion-depreciacion.component.scss']
})
export class GestionDepreciacionComponent implements AfterViewInit  {
  depreciacion: DepreciacionesModel = {
    idDepreciacion: 0,
    fecha: new Date(),
    metodo: '',
    detalle: '',
    idDivisa: 1
  };

  agregarDepreciacion() {
    this.store.dispatch(new AddDepreciacion(this.depreciacion));
    this.depreciacion = {
      idDepreciacion: 0,
      fecha: new Date(),
      metodo: '',
      detalle: '',
      idDivisa: 1
    }
  }

  eliminarDepreciacion(id: number) {
    this.store.dispatch(new DeleteDepreciacion(id));
  }

  actualizarDepreciacion(rol: DepreciacionesModel) {    
    this.store.dispatch(new UpdateDepreciacion(this.depreciacion));
  }

  depreciacion$: Observable<DepreciacionesModel[]>;
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
  displayedColumns: string[] = ['select', 'fecha', 'metodo', 'detalle', 'accion'];
  dataSource: MatTableDataSource<DepreciacionesModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<DepreciacionesModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store) {
    this.depreciacion$ = this.store.select(DepreciacionState.getDepreciaciones);
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
      row.depreciacion + 1
    }`;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los roles
    this.store.dispatch(new GetDepreciacion());

    // Suscríbete al observable para actualizar el dataSource
    this.depreciacion$.subscribe((depreciacion) => {
      this.dataSource.data = depreciacion; // Asigna los datos al dataSource
    });
  }
}
