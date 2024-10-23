import { Component, ViewChild } from '@angular/core';
import { ModeloModel } from '../models/modelo.model';
import { AddModelo, DeleteModelo, GetModelo, UpdateModelo } from '../state-management/modelo/modelo.action';
import { Observable } from 'rxjs';
import { ModeloState } from '../state-management/modelo/modelo.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { MarcaModel } from '../models/marca.model';
import { MarcaState } from '../state-management/marca/marca.state';
import { GetMarca } from '../state-management/marca/marca.action';

@Component({
  selector: 'app-gestion-modelos',
  templateUrl: './gestion-modelos.component.html',
  styleUrls: ['./gestion-modelos.component.scss']
})
export class GestionModelosComponent {
  marcas$: Observable<MarcaModel[]>; // Observable que contiene los roles
  marcas: MarcaModel[] = [];
  modelo: ModeloModel = {
    idModelo: 0,
    nombre: '',
    marcaId: 0,
    descripcion: '',
    estado: true
  };
  
  agregarModelo() {
    this.store.dispatch(new AddModelo(this.modelo));
    this.modelo = {
      idModelo: 0,
      nombre: '',
      marcaId: 0,
      descripcion: '',
      estado: true
    };
  }
  
  eliminarModelo(id: number) {
    this.store.dispatch(new DeleteModelo(id));
  }
  
  actualizarModelo(modelo: ModeloModel) {    
    this.store.dispatch(new UpdateModelo(this.modelo));
  }
  
  modelos$: Observable<ModeloModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  
  displayedColumns: string[] = ['select', 'marca', 'nombre', 'descripcion', 'estado', 'accion'];
  dataSource: MatTableDataSource<ModeloModel> = new MatTableDataSource(); 
  selection = new SelectionModel<ModeloModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store, public pdfreportService: PdfreportService) {
    this.modelos$ = this.store.select(ModeloState.getModelos);
    this.marcas$ = this.store.select(MarcaState.getMarcas);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const modelosSeleccionados = this.selection.selected;
    const marcas = this.marcas$; // Aquí debes asegurarte de que tienes los roles correctamente cargados
  
    // Suscribirse a los marcas para obtener la lista y generar el PDF
    marcas.subscribe((marcalist: MarcaModel[]) => {
      this.pdfreportService.modelospdf(modelosSeleccionados, marcalist);
    });
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

  // Función para obtener el nombre del rol por ID
  getMarcaName(rolId: number): string {
    if (!this.marcas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const marca = this.marcas.find((r) => r.idMarca === rolId);
    return marca ? marca.nombre : 'Sin Marcas';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
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
    this.store.dispatch([new GetModelo(), new GetMarca()]);

    // Suscríbete al observable para actualizar el dataSource
    this.modelos$.subscribe((modelos) => {
      this.dataSource.data = modelos; // Asigna los datos al dataSource
    });

    this.marcas$.subscribe((marcas) => {
      this.marcas = marcas;
    });
  }
  
}
