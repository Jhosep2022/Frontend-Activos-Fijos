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
import { Store } from '@ngxs/store';
import { DeleteUser, GetUsers } from '../state-management/user/user.actions';
import { Observable } from 'rxjs';
import { UserState } from '../state-management/user/user.state';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionUsuariosComponent implements AfterViewInit {
  usuarios$: Observable<UserModel[]>;
  displayedColumns: string[] = [
    'select',
    'idUsuario',
    'nombre',
    'correo',
    'estado',
    'telefono',
    'rolId',
    'action'
  ];
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<UserModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store) {
    this.usuarios$ = this.store.select(UserState.getUsers);
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch(new GetUsers());

    // Suscríbete al observable para actualizar el dataSource
    this.usuarios$.subscribe((users) => {
      this.dataSource.data = users; // Asigna los datos al dataSource
    });
  }

  ngAfterViewInit() {
    // Configurar la paginación y la ordenación
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarUser(id: number) {
    this.store.dispatch(new DeleteUser(id));
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

  // Sidebar menu activation
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
}
