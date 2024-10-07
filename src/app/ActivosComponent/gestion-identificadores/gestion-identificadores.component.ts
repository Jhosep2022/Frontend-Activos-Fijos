import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IdentificadoresModel } from '../models/identificadores.model';
import { AddIdentificador, DeleteIdentificador, GetIdentificador, UpdateIdentificador } from '../state-management/identificadores/identificadores.action';
import { IdentificadorState } from '../state-management/identificadores/identificadores.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-identificadores',
  templateUrl: './gestion-identificadores.component.html',
  styleUrls: ['./gestion-identificadores.component.scss']
})
export class GestionIdentificadoresComponent implements AfterViewInit {
  identificador: IdentificadoresModel = {
    idIdentificador: 0,
    codigoQr: '',
    codigoBarra: ''
  };

  agregarIdentificador() {
    this.store.dispatch(new AddIdentificador(this.identificador));
    this.identificador = {
      idIdentificador: 0,
      codigoQr: '',
      codigoBarra: ''
    };
  }

  eliminarIdentificador(id: number) {
    this.store.dispatch(new DeleteIdentificador(id));
  }

  actualizarIdentificador(identificador: IdentificadoresModel) {    
    this.store.dispatch(new UpdateIdentificador(this.identificador));
  }

  identificadores$: Observable<IdentificadoresModel[]>;
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
  displayedColumns: string[] = ['select', 'barra', 'qr', 'accion'];
  dataSource: MatTableDataSource<IdentificadoresModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<IdentificadoresModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store) {
    this.identificadores$ = this.store.select(IdentificadorState.getIdentificadores);
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
      row.identificador + 1
    }`;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los roles
    this.store.dispatch(new GetIdentificador());

    // Suscríbete al observable para actualizar el dataSource
    this.identificadores$.subscribe((identificadores) => {
      this.dataSource.data = identificadores; // Asigna los datos al dataSource
    });
  }
}
