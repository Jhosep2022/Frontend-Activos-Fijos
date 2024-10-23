import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockReportInterfaceData, stockReportData } from 'src/app/inventual/data/stockReportData';
import { ActivosModel } from '../models/activos.model';
import { Observable } from 'rxjs';
import { AulaModel, BloqueModel } from '../models/ubicacion.model';
import { CategoriaModel } from '../models/categorias.model';
import { CustodiosModel } from '../models/custodios.model';
import { DepreciacionesModel } from '../models/depreciaciones.model';
import { EstadosModel } from '../models/estadosUso.model';
import { ProyectoModel } from '../models/proyecto.model';
import { ModeloModel } from '../models/modelo.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { ActivoState } from '../state-management/activos/activos.state';
import { AulaState } from '../state-management/ubicacion/aula/aula.state';
import { BloqueState } from '../state-management/ubicacion/bloque/bloque.state';
import { CategoriaState } from '../state-management/categoria/categoria.state';
import { CustodiosState } from '../state-management/custodios/custodios.state';
import { DepreciacionState } from '../state-management/depreciaciones/depreciacion.state';
import { EstadoState } from '../state-management/estado/estado.state';
import { ProyectoState } from '../state-management/proyecto/proyecto.state';
import { ModeloState } from '../state-management/modelo/modelo.state';
import { DeleteActivo, GetActivo } from '../state-management/activos/activos.action';
import { GetAula } from '../state-management/ubicacion/aula/aula.actions';
import { GetBloque } from '../state-management/ubicacion/bloque/bloque.actions';
import { GetCategoria } from '../state-management/categoria/categoria.action';
import { GetCustodio } from '../state-management/custodios/custodios.action';
import { GetDepreciacion } from '../state-management/depreciaciones/depreciacion.action';
import { GetEstado } from '../state-management/estado/estado.action';
import { GetProyecto } from '../state-management/proyecto/proyecto.action';
import { GetModelo } from '../state-management/modelo/modelo.action';


@Component({
  selector: 'app-lista-activos',
  templateUrl: './lista-activos.component.html',
  styleUrls: ['./lista-activos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListaActivosComponent implements AfterViewInit {
  activos$: Observable<ActivosModel[]>;
  aulas$: Observable<AulaModel[]>;
  aulas: AulaModel[] = [];
  bloques$: Observable<BloqueModel[]>;
  bloques: BloqueModel[] = [];
  categorias$: Observable<CategoriaModel[]>;
  categorias: CategoriaModel[] = [];
  custodios$: Observable<CustodiosModel[]>;
  custodios: CustodiosModel[] = [];
  depreciaciones$: Observable<DepreciacionesModel[]>;
  depreciaciones: DepreciacionesModel[] = [];
  estadouso$: Observable<EstadosModel[]>;
  estadouso: EstadosModel[] = [];
  proyectos$: Observable<ProyectoModel[]>;
  proyectos: ProyectoModel[] = [];
  modelos$: Observable<ModeloModel[]>;
  modelos: ModeloModel[] = [];

  aulaslist: AulaModel[] = [];
  bloqueslist: BloqueModel[] = [];
  categoriaslist: CategoriaModel[] = [];
  custodioslist: CustodiosModel[] = [];
  depreciacioneslist: DepreciacionesModel[] = [];
  estadoslist: EstadosModel[] = [];
  proyectoslist: ProyectoModel[] = [];
  modeloslist: ModeloModel[] = [];

  displayedColumns: string[] = [
    'select',
    'nombre',
    'valorActual',
    'valorInicial',
    'fechaRegistro',
    'detalle',
    'estado',
    'precio',
    'comprobanteCompra',
    'idAula',
    'idBloque',
    'idCategoria',
    'idCustodio',
    'idDepreciacion',
    'idEstadoactivo',
    'idProyecto',
    'idModelo',
    'action'
  ];
  dataSource: MatTableDataSource<ActivosModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<ActivosModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService) {
    this.activos$ = this.store.select(ActivoState.getActivos);
    this.aulas$ = this.store.select(AulaState.getAulas);
    this.bloques$ = this.store.select(BloqueState.getBloques);
    this.categorias$ = this.store.select(CategoriaState.getCategorias);
    this.custodios$ = this.store.select(CustodiosState.getCustodios);
    this.depreciaciones$ = this.store.select(DepreciacionState.getDepreciaciones);
    this.estadouso$ = this.store.select(EstadoState.getEstados);
    this.proyectos$ = this.store.select(ProyectoState.getProyectos);
    this.modelos$ = this.store.select(ModeloState.getModelos);
  }

  generarPDF() {
    const activosSeleccionados = this.selection.selected;
    
    this.aulas$.subscribe((aulas: AulaModel[]) => {
      this.aulaslist = aulas;
    });
    this.bloques$.subscribe((bloques: BloqueModel[]) => {
      this.bloqueslist = bloques;
    });
    this.categorias$.subscribe((categorias: CategoriaModel[]) => {
      this.categoriaslist = categorias;
    });
    this.custodios$.subscribe((custodios: CustodiosModel[]) => {
      this.custodioslist = custodios;
    });
    this.depreciaciones$.subscribe((depreciaciones: DepreciacionesModel[]) => {
      this.depreciacioneslist = depreciaciones;
    });
    this.estadouso$.subscribe((estados: EstadosModel[]) => {
      this.estadoslist = estados;
    });
    this.proyectos$.subscribe((proyectos: ProyectoModel[]) => {
      this.proyectoslist = proyectos;
    });
    this.modelos$.subscribe((modelos: ModeloModel[]) => {
      this.modeloslist = modelos;
    });
    this.pdfreportService.activopdf(activosSeleccionados, this.aulaslist, this.bloqueslist, this.categoriaslist, this.custodioslist, this.depreciacioneslist, this.estadoslist, this.proyectoslist, this.modeloslist);
  }

  // Función para obtener el nombre del rol por ID
  getAulaName(rolId: number): string {
    if (!this.aulas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const aula = this.aulas.find((r) => r.idAula === rolId);
    return aula ? aula.nombre : 'Sin Aula';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  getBloqueName(rolId: number): string {
    if (!this.bloques.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const bloque = this.bloques.find((r) => r.idBloque === rolId);
    return bloque ? bloque.nombre : 'Sin Bloque';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  getCategoriaName(rolId: number): string {
    if (!this.categorias.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const categoria = this.categorias.find((r) => r.idCategoria === rolId);
    return categoria ? categoria.nombre : 'Sin Categoria';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  getCustodioName(rolId: number): string {
    if (!this.custodios.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const custodio = this.custodios.find((r) => r.idCustodio === rolId);
    return custodio ? custodio.nombre : 'Sin Custodio';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  
  getDepreciacionName(rolId: number): string {
    if (!this.depreciaciones.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const depreciacion = this.depreciaciones.find((r) => r.idDepreciacion === rolId);
    return depreciacion ? depreciacion.metodo : 'Sin Depreciacion';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  getEstadoName(rolId: number): string {
    if (!this.estadouso.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const estado = this.estadouso.find((r) => r.idEstado === rolId);
    return estado ? estado.nombre : 'Sin Estado';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  getProyectoName(rolId: number): string {
    if (!this.proyectos.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const proyecto = this.proyectos.find((r) => r.idProyecto === rolId);
    return proyecto ? proyecto.nombre : 'Sin Proyecto';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  getModeloName(rolId: number): string {
    if (!this.modelos.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const modelo = this.modelos.find((r) => r.idModelo === rolId);
    return modelo ? modelo.nombre : 'Sin Modelo';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetActivo(), new GetAula(), new GetBloque(), new GetCategoria(), new GetCustodio(), new GetDepreciacion(), new GetEstado(), new GetProyecto(), new GetModelo()]);

    // Suscríbete al observable para actualizar el dataSource
    this.activos$.subscribe((activos) => {
      this.dataSource.data = activos; // Asigna los datos al dataSource
    });

    this.aulas$.subscribe((aulas) => {
      this.aulas = aulas;
    });
    this.bloques$.subscribe((bloques) => {
      this.bloques = bloques;
    });
    this.categorias$.subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.custodios$.subscribe((custodios) => {
      this.custodios = custodios;
    });
    this.depreciaciones$.subscribe((depreciaciones) => {
      this.depreciaciones = depreciaciones;
    });
    this.estadouso$.subscribe((estados) => {
      this.estadouso = estados;
    });
    this.proyectos$.subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
    this.modelos$.subscribe((modelos) => {
      this.modelos = modelos;
    });
  }

  ngAfterViewInit() {
    // Configurar la paginación y la ordenación
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarUser(id: number) {
    this.store.dispatch(new DeleteActivo(id));
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idActivo + 1}`;
  }

  // Sidebar menu activation
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
}
