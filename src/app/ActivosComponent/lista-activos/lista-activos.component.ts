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
import { ActivosModel, ActivosStringModel } from '../models/activos.model';
import { map, Observable } from 'rxjs';
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
import { CalcularDepreciacionService } from '../services/calcular-depreciacion.service';
import { MarcaState } from '../state-management/marca/marca.state';
import { MarcaModel } from '../models/marca.model';
import { GetMarca } from '../state-management/marca/marca.action';
import { CsvreportService } from '../services/reportes/csvreport.service';
import { AreaModel } from '../models/area.model';
import { AreasState } from '../state-management/area/area.state';
import { GetArea } from '../state-management/area/area.action';
import { get } from 'http';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';
import { DivisaState } from '../state-management/divisa/divisa.state';
import { DivisaModel } from '../models/divisa.model';
import { GetCurrency } from '../state-management/divisa/divisa.action';


@Component({
  selector: 'app-lista-activos',
  templateUrl: './lista-activos.component.html',
  styleUrls: ['./lista-activos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListaActivosComponent implements AfterViewInit {
  fechaActual: Date = new Date();
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
  monedas$: Observable<DivisaModel[]>;
  monedas: DivisaModel[] = [];

  aulaslist: AulaModel[] = [];
  bloqueslist: BloqueModel[] = [];
  categoriaslist: CategoriaModel[] = [];
  custodioslist: CustodiosModel[] = [];
  depreciacioneslist: DepreciacionesModel[] = [];
  estadoslist: EstadosModel[] = [];
  proyectoslist: ProyectoModel[] = [];
  modeloslist: ModeloModel[] = [];

  marcas$: Observable<MarcaModel[]>; 
  marcas: MarcaModel[] = [];
  areas$: Observable<AreaModel[]>; 
  areas: AreaModel[] = [];

  fechaDepreciar: Date = new Date();

  displayedColumns: string[] = [
    'select',
    'nombre',
    'idProyecto',
    'estado',
    'idCategoria',
    'idModelo',
    'detalle',
    'fechaRegistro',
    'meses',
    'valorActual',
    'valorInicial',
    'comprobanteCompra',
    'idAula',
    'idCustodio',
    'idEstadoactivo',
    'action'
  ];
  dataSource: MatTableDataSource<ActivosStringModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<ActivosModel>(true, []);

  moneda: DivisaModel = {
    idDivisa: 0,
    valor: 1,
    nombre: 'Bolivianos',
    abreviacion: 'Bs'
  };

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, public calcularDepreciacionService: CalcularDepreciacionService, public csvreportService: CsvreportService, public dialogsAccessService: DialogsAccessService) {
    this.activos$ = this.store.select(ActivoState.getActivos);
    this.aulas$ = this.store.select(AulaState.getAulas);
    this.bloques$ = this.store.select(BloqueState.getBloques);
    this.categorias$ = this.store.select(CategoriaState.getCategorias);
    this.custodios$ = this.store.select(CustodiosState.getCustodios);
    this.depreciaciones$ = this.store.select(DepreciacionState.getDepreciaciones);
    this.estadouso$ = this.store.select(EstadoState.getEstados);
    this.proyectos$ = this.store.select(ProyectoState.getProyectos);
    this.modelos$ = this.store.select(ModeloState.getModelos);
    this.monedas$ = this.store.select(DivisaState.getDivisa);

    this.marcas$ = this.store.select(MarcaState.getMarcas);
    this.areas$ = this.store.select(AreasState.getAreas);
  }
  nombreMarca(marcaId: number): string {    
    if (!this.marcas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const marca = this.marcas.find((r) => r.idMarca === marcaId);
    return marca ? marca.nombre : 'Sin Marca';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  obtenerFechaInicial(fechaInicial: Date): Date {
    const fecha = new Date(fechaInicial);
    return fecha;
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
    this.pdfreportService.activopdf(activosSeleccionados, this.aulaslist, this.bloqueslist, this.categoriaslist, this.custodioslist, this.depreciacioneslist, this.estadoslist, this.proyectoslist, this.modeloslist, this.areas, this.marcas, this.moneda);
  }
  
  generarCSV() {
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
    this.csvreportService.activocsv(activosSeleccionados, this.aulaslist, this.bloqueslist, this.categoriaslist, this.custodioslist, this.depreciacioneslist, this.estadoslist, this.proyectoslist, this.modeloslist, this.areas, this.marcas, this.moneda);
  }

  // Función para obtener el nombre del rol por ID
  getAulaName(rolId: number): string {
    if (!this.aulas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const aula = this.aulas.find((r) => r.idAula === rolId);
    return aula ? (aula.nombre+"("+aula.codigoUbicacion+")") : 'Sin Aula';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
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
    return custodio ? (custodio.nombre+" "+custodio.apellidoPaterno+" "+custodio.apellidoMaterno+" - "+custodio.ci) : 'Sin Custodio';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
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
  getAreaName(areaId: number): string {
    if (!this.areas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const area = this.areas.find((r) => r.idArea === areaId);
    return area ? area.nombre : 'Sin Area';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  getProyectoName(rolId: number): string {
    if (!this.proyectos.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const proyecto = this.proyectos.find((r) => r.idProyecto === rolId);
    let areanombre = 'Sin Area';
    if (proyecto?.idArea !== undefined) {
      areanombre = this.getAreaName(proyecto.idArea);
    }
    return proyecto ? (areanombre+" - "+proyecto.nombre) : 'Sin Proyecto';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  getModeloName(rolId: number): string {
    if (!this.modelos.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const modelo = this.modelos.find((r) => r.idModelo === rolId);
    let marcanombre = 'Sin Marca';
    if (modelo?.marcaId !== undefined) {
      marcanombre = this.nombreMarca(modelo.marcaId);
    }
    return modelo ? (marcanombre +" - "+modelo.nombre) : 'Sin Modelo';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  buscarBoliviano(){
    this.moneda = this.monedas.find((r) => r.nombre === 'Boliviano') || {
      idDivisa: 0,
      valor: 1,
      nombre: '',
      abreviacion: 'Bs'
    };
    return this.moneda;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetCurrency() ,new GetArea(), new GetMarca(), new GetActivo(), new GetAula(), new GetBloque(), new GetCategoria(), new GetCustodio(), new GetDepreciacion(), new GetEstado(), new GetProyecto(), new GetModelo()]);

    // Suscríbete al observable para actualizar el dataSource
    this.transformarDatosString().subscribe((activos) => {
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
    this.marcas$.subscribe((marcas) => {
      this.marcas = marcas;
    }); 
    this.areas$.subscribe((areas) => {
      this.areas = areas;
    });
    this.monedas$.subscribe((monedas) => {
      this.monedas = monedas;
    });
  }

  ngAfterViewInit() {
    // Configurar la paginación y la ordenación
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarActivo(id: number) {
    //this.store.dispatch(new DeleteActivo(id));
    this.dialogsAccessService.eliminarElemento(id, 'Activo');
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

  transformarDatosString(){
    const listaActual$: Observable<ActivosModel[]> = this.activos$;
    const listaModificada$: Observable<ActivosStringModel[]> = listaActual$.pipe(
      map((objetos: ActivosModel[]) =>
        objetos.map((objeto: ActivosModel) => ({
          idActivo: objeto.idActivo,
          nombre: objeto.nombre,
          valorActual: objeto.valorActual,
          valorInicial: objeto.valorInicial,
          fechaRegistro: objeto.fechaRegistro, // Usamos string para representar la fecha con formato ISO
          detalle: objeto.detalle,
          estado: objeto.estado,
          precio: objeto.precio,
          comprobanteCompra: objeto.comprobanteCompra,
          estadoActivo: objeto.estadoActivo,
          aulaId: objeto.aulaId,
          categoriaId: objeto.categoriaId,
          custodioId: objeto.custodioId,
          proyectoId: objeto.proyectoId,
          idModelo: objeto.idModelo,
          aulaIdstring: this.getAulaName(objeto.aulaId),
          categoriaIdstring: this.getCategoriaName(objeto.categoriaId),
          custodioIdstring: this.getCustodioName(objeto.custodioId),
          proyectoIdstring: this.getProyectoName(objeto.proyectoId),
          idModelostring: this.getModeloName(objeto.idModelo),
        }))
      )
    );    
    return listaModificada$;
  }
}
