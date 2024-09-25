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
import { Observable } from 'rxjs';
import { RolModel } from '../models/rol.model';
import { RolState } from '../state-management/rol/rol.state';
import { AddRol, GetRols } from '../state-management/rol/rol.actions';
import { Store } from '@ngxs/store';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-gestion-roles',
  templateUrl: './gestion-roles.component.html',
  styleUrls: ['./gestion-roles.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionRolesComponent implements AfterViewInit {
  rol: RolModel = {
    nombre: '',
    idRol: 0,
  };

  agregarRol() {
    this.store.dispatch(new AddRol(this.rol));
    this.rol = {
      nombre: '',
      idRol: 0,
    };
  }
  roles$: Observable<RolModel[]>;
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
  displayedColumns: string[] = ['select', 'nombre', 'accion'];
  dataSource: MatTableDataSource<RolModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<RolModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store) {
    this.roles$ = this.store.select(RolState.getRols);
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
    this.store.dispatch(new GetRols());

    // Suscríbete al observable para actualizar el dataSource
    this.roles$.subscribe((roles) => {
      this.dataSource.data = roles; // Asigna los datos al dataSource
    });
  }
}
