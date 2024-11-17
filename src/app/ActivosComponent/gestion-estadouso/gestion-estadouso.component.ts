import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EstadosModel } from '../models/estadosUso.model';
import { AddEstado, DeleteEstado, GetEstado, UpdateEstado } from '../state-management/estado/estado.action';
import { EstadoState } from '../state-management/estado/estado.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CsvreportService } from '../services/reportes/csvreport.service';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';

@Component({
  selector: 'app-gestion-estadouso',
  templateUrl: './gestion-estadouso.component.html',
  styleUrls: ['./gestion-estadouso.component.scss']
})
export class GestionEstadousoComponent implements AfterViewInit {
  estado: EstadosModel = {
    idEstado: 0,
    nombre: '',
    descripcion: ''
  };

  agregarEstado() {
    this.store.dispatch(new AddEstado(this.estado)).subscribe({
      next: () => {
        console.log('Estado Registrado exitosamente');
        this.openSnackBar('Estado Registrado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al Registrar Estado:', error);
        this.openSnackBar('El Estado no se pudo Registrar', 'Cerrar');
      }
    });
    this.estado = {
      idEstado: 0,
      nombre: '',
      descripcion: ''
    };
  }

  eliminarEstado(id: number) {
    this.dialogsAccessService.eliminarElemento(id, 'Estado');
  }

  actualizarEstado(estado: EstadosModel) {    
    this.store.dispatch(new UpdateEstado(this.estado));
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  estados$: Observable<EstadosModel[]>;
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
  displayedColumns: string[] = ['select', 'nombre', 'descripcion', 'accion'];
  dataSource: MatTableDataSource<EstadosModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<EstadosModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialogsAccessService: DialogsAccessService,private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService) {
    this.estados$ = this.store.select(EstadoState.getEstados);
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
      row.idEstado + 1
    }`;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los roles
    this.store.dispatch(new GetEstado());

    // Suscríbete al observable para actualizar el dataSource
    this.estados$.subscribe((estados) => {
      this.dataSource.data = estados; // Asigna los datos al dataSource
    });
  }

  generarPDF() {
    const estadosSeleccionados = this.selection.selected;
    this.pdfreportService.estadospdf(estadosSeleccionados);
  }

  generarCSV() {
    const estadosSeleccionados = this.selection.selected;
    this.csvreportService.estadosUsoCSV(estadosSeleccionados);
  }
}
