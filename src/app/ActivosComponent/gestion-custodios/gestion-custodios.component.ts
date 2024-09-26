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
import { RoleInterfaceData, roleData } from 'src/app/inventual/data/roleData';
import { CustodiosModel } from '../models/custodios.model';
import { AddCustodio, DeleteCustodio, GetCustodio, UpdateCustodio } from '../state-management/custodios/custodios.action';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CustodiosState } from '../state-management/custodios/custodios.state';

@Component({
  selector: 'app-gestion-custodios',
  templateUrl: './gestion-custodios.component.html',
  styleUrls: ['./gestion-custodios.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionCustodiosComponent implements AfterViewInit {
  custodio: CustodiosModel = {
    idCustodio: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: ''
  };

  agregarCustodio() {
    this.store.dispatch(new AddCustodio(this.custodio));
    this.custodio = {
      idCustodio: 0,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      telefono: ''
    };
  }

  eliminarCustodio(id: number) {
    this.store.dispatch(new DeleteCustodio(id));
  }

  actualizarCustodio(rol: CustodiosModel) {    
    this.store.dispatch(new UpdateCustodio(this.custodio));
  }

  roles$: Observable<CustodiosModel[]>;
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
  displayedColumns: string[] = ['select', 'nombrecompleto', 'telefono', 'correo', 'accion'];
  dataSource: MatTableDataSource<CustodiosModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<CustodiosModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store) {
    this.roles$ = this.store.select(CustodiosState.getCustodios);
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
    this.store.dispatch(new GetCustodio());

    // Suscríbete al observable para actualizar el dataSource
    this.roles$.subscribe((roles) => {
      this.dataSource.data = roles; // Asigna los datos al dataSource
    });
  }
}
