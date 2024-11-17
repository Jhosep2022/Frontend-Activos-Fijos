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
import { map, Observable } from 'rxjs';
import { UserState } from '../state-management/user/user.state';
import { UserModel, UserStringModel } from '../models/user.model';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { GetRols } from '../state-management/rol/rol.actions';
import { RolState } from '../state-management/rol/rol.state';
import { RolModel } from '../models/rol.model';
import { CsvreportService } from '../services/reportes/csvreport.service';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionUsuariosComponent implements AfterViewInit {
  usuarios$: Observable<UserModel[]>;
  roles$: Observable<RolModel[]>;
  roles: RolModel[] = [];
  displayedColumns: string[] = [
    'select',
    //'idUsuario',
    'nombre',
    'correo',
    'estado',
    'telefono',
    'rolId',
    'action'
  ];
  dataSource: MatTableDataSource<UserStringModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<UserModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, public csvreportService: CsvreportService, public dialogsAccessService: DialogsAccessService) {
    this.usuarios$ = this.store.select(UserState.getUsers);
    this.roles$ = this.store.select(RolState.getRols);
  }

  generarPDF() {
    const usuariosSeleccionados = this.selection.selected;
    const roles = this.roles$; // Aquí debes asegurarte de que tienes los roles correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    roles.subscribe((rollist: RolModel[]) => {
      this.pdfreportService.userpdf(usuariosSeleccionados, rollist);
    });
  }

  generarCSV() {
    console.log('Generando CSV...');
    const usuariosSeleccionados = this.selection.selected;
    const roles = this.roles$; // Aquí debes asegurarte de que tienes los roles correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    roles.subscribe((rollist: RolModel[]) => {
      this.csvreportService.usuariosCSV(usuariosSeleccionados, rollist);
    });
  }

  // Función para obtener el nombre del rol por ID
  getRolName(rolId: number): string {
    if (!this.roles.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const rol = this.roles.find((r) => r.idRol === rolId);
    return rol ? rol.nombre : 'Sin Rol';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetUsers(), new GetRols()]);

    // Suscríbete al observable para actualizar el dataSource
    this.transformarDatosString().subscribe((users) => {
      this.dataSource.data = users; // Asigna los datos al dataSource
    });

    this.roles$.subscribe((roles) => {
      this.roles = roles;
    });
  }

  ngAfterViewInit() {
    // Configurar la paginación y la ordenación
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarUser(id: number) {
    //this.store.dispatch(new DeleteUser(id));
    this.dialogsAccessService.eliminarElemento(id, 'Usuario');
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idUsuario + 1}`;
  }

  // Sidebar menu activation
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }

  transformarDatosString(){
    const listaActual$: Observable<UserModel[]> = this.usuarios$;
    const listaModificada$: Observable<UserStringModel[]> = listaActual$.pipe(
      map((objetos: UserModel[]) =>
        objetos.map((objeto: UserModel) => ({
          idUsuario: objeto.idUsuario,
          nombre: objeto.nombre,
          apellidoPaterno: objeto.apellidoPaterno,
          apellidoMaterno: objeto.apellidoMaterno,
          password: objeto.password,
          correo: objeto.correo,
          estado: objeto.estado,
          telefono: objeto.telefono,
          rolId: objeto.rolId,
          rolIdstring: this.getRolName(objeto.rolId),
        }))
      )
    );    
    return listaModificada$;
  }
}
