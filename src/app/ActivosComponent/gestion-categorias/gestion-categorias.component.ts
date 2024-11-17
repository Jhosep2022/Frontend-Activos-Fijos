import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CategoriaModel } from '../models/categorias.model';
import { AddCategoria, DeleteCategoria, GetCategoria, UpdateCategoria } from '../state-management/categoria/categoria.action';
import { Observable } from 'rxjs';
import { CategoriaState } from '../state-management/categoria/categoria.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';
import { CsvreportService } from '../services/reportes/csvreport.service';

@Component({
  selector: 'app-gestion-categorias',
  templateUrl: './gestion-categorias.component.html',
  styleUrls: ['./gestion-categorias.component.scss']
})
export class GestionCategoriasComponent implements AfterViewInit {
  categoria: CategoriaModel = {
    idCategoria: 0,
    nombre: '',
    tiempoDeVida: 0,
    coeficienteAnual: 0
  };

  agregarCategoria() {    
    this.store.dispatch(new AddCategoria(this.categoria)).subscribe({
      next: () => {
        console.log('Categoria agregada exitosamente');
        this.openSnackBar('Categoria agregada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregada Categoria:', error);
        this.openSnackBar('La Categoria no se pudo agregada', 'Cerrar');
      }
    });
    this.categoria = {
      idCategoria: 0,
      nombre: '',
      tiempoDeVida: 0,
      coeficienteAnual: 0
    };
  }

  eliminarCategoria(id: number) {    
    this.dialogsAccessService.eliminarElemento(id, 'Categoria');
  }

  actualizarCategoria(rol: CategoriaModel) {    
    this.store.dispatch(new UpdateCategoria(this.categoria));
  }

  categorias$: Observable<CategoriaModel[]>;
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
  displayedColumns: string[] = ['select', 'nombre', 'tiempoDeVida', 'coeficienteAnual','accion'];
  dataSource: MatTableDataSource<CategoriaModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<CategoriaModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public dialogsAccessService: DialogsAccessService, public csvreportService: CsvreportService) {
    this.categorias$ = this.store.select(CategoriaState.getCategorias);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const categoriasSeleccionados = this.selection.selected;
    this.pdfreportService.categoriaspdf(categoriasSeleccionados);
  }

  generarCSV() {
    const categoriasSeleccionados = this.selection.selected;
    this.csvreportService.categoriasCSV(categoriasSeleccionados);
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
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
      row.idCategoria + 1
    }`;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los roles
    this.store.dispatch(new GetCategoria());

    // Suscríbete al observable para actualizar el dataSource
    this.categorias$.subscribe((identificadores) => {
      this.dataSource.data = identificadores; // Asigna los datos al dataSource
    });
  }
}
