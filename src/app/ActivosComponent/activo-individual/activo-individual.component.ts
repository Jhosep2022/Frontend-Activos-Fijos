import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  ProductInterfaceData,
  productData,
} from 'src/app/inventual/data/productData';
import { PosCategoriesInterfaceData } from 'src/app/inventual/data/posCategoriesData';
import { PosBrandsInterfaceData } from 'src/app/inventual/data/posBrandsData';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ActivosModel } from '../models/activos.model';
import { ActivoState } from '../state-management/activos/activos.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';
import { CsvreportService } from '../services/reportes/csvreport.service';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { DeleteActivo, GetActivo, UpdateActivo } from '../state-management/activos/activos.action';
import { SelectionModel } from '@angular/cdk/collections';
import { AreaModel } from '../models/area.model';
import { CategoriaModel } from '../models/categorias.model';
import { CustodiosModel } from '../models/custodios.model';
import { DepreciacionesModel } from '../models/depreciaciones.model';
import { EstadosModel } from '../models/estadosUso.model';
import { MarcaModel } from '../models/marca.model';
import { ModeloModel } from '../models/modelo.model';
import { ProyectoModel } from '../models/proyecto.model';
import { AulaModel, BloqueModel, DepartamentoModel, DireccionModel, MunicipioModel, PaisModel, ProvinciaModel, SucursalModel } from '../models/ubicacion.model';
import { CalcularDepreciacionService } from '../services/calcular-depreciacion.service';
import { GetArea } from '../state-management/area/area.action';
import { AreasState } from '../state-management/area/area.state';
import { GetCategoria } from '../state-management/categoria/categoria.action';
import { CategoriaState } from '../state-management/categoria/categoria.state';
import { GetCustodio } from '../state-management/custodios/custodios.action';
import { CustodiosState } from '../state-management/custodios/custodios.state';
import { GetDepreciacion } from '../state-management/depreciaciones/depreciacion.action';
import { DepreciacionState } from '../state-management/depreciaciones/depreciacion.state';
import { GetEstado } from '../state-management/estado/estado.action';
import { EstadoState } from '../state-management/estado/estado.state';
import { GetMarca } from '../state-management/marca/marca.action';
import { MarcaState } from '../state-management/marca/marca.state';
import { GetModelo } from '../state-management/modelo/modelo.action';
import { ModeloState } from '../state-management/modelo/modelo.state';
import { GetProyecto } from '../state-management/proyecto/proyecto.action';
import { ProyectoState } from '../state-management/proyecto/proyecto.state';
import { GetAula } from '../state-management/ubicacion/aula/aula.actions';
import { AulaState } from '../state-management/ubicacion/aula/aula.state';
import { GetBloque } from '../state-management/ubicacion/bloque/bloque.actions';
import { BloqueState } from '../state-management/ubicacion/bloque/bloque.state';
import { ChangeDetectorRef } from '@angular/core';
import { HistorialActivosModel } from '../models/historial-activos.model';
import { HistorialActivoState } from '../state-management/historial-activo/historial-activo.state';
import { AddHistorialActivo, GetHistorialActivo, GetHistorialActivoByActivoId } from '../state-management/historial-activo/historial-activo.action';
import { IdentificadorState } from '../state-management/identificadores/identificadores.state';
import { IdentificadoresModel } from '../models/identificadores.model';
import { DepartamentoState } from '../state-management/ubicacion/departamento/departamento.state';
import { DireccionState } from '../state-management/ubicacion/direccion/direccion.state';
import { MunicipioState } from '../state-management/ubicacion/municipio/municipio.state';
import { PaisState } from '../state-management/ubicacion/pais/pais.state';
import { ProvinciaState } from '../state-management/ubicacion/provincia/provincia.state';
import { SucursalState } from '../state-management/ubicacion/sucursal/sucursal.state';
import { GetDepartamento } from '../state-management/ubicacion/departamento/departamento.actions';
import { GetDireccion } from '../state-management/ubicacion/direccion/direccion.actions';
import { GetMunicipio } from '../state-management/ubicacion/municipio/municipio.actions';
import { GetPais } from '../state-management/ubicacion/pais/pais.actions';
import { GetProvincia } from '../state-management/ubicacion/provincia/provincia.actions';
import { GetSucursal } from '../state-management/ubicacion/sucursal/sucursal.actions';
import { ActivoService } from '../services/activo.service';
import { UbicacionActivoModel } from '../models/direccion-activo.model';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-activo-individual',
  templateUrl: './activo-individual.component.html',
  styleUrls: ['./activo-individual.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActivoIndividualComponent implements AfterViewInit {
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
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
  
  paises$: Observable<PaisModel[]>;  
  departamentos$: Observable<DepartamentoModel[]>;
  provincias$: Observable<ProvinciaModel[]>;
  municipios$: Observable<MunicipioModel[]>;
  sucursales$: Observable<SucursalModel[]>;
  direcciones$: Observable<DireccionModel[]>;

  marcas$: Observable<MarcaModel[]>; 
  marcas: MarcaModel[] = [];
  areas$: Observable<AreaModel[]>; 
  areas: AreaModel[] = [];
  @Select(HistorialActivoState.getHistorialesActivos) historialActivos$!: Observable<HistorialActivosModel[]>;
  historialActivos: HistorialActivosModel[] = [];
  
  filteredActivos!: Observable<ActivosModel[]>;
  myControl = new FormControl(''); 

  fechaDepreciar: Date = new Date(); 

  pais: PaisModel = {
    idPais: 0,
    nombre: ''
  };

  departamento: DepartamentoModel = {
    idDepartamento: 0,
    nombre: '',
    idPais: 0
  };

  provincia: ProvinciaModel = {
    idProvincia: 0,
    nombre: '',
    idDepartamento: 0
  };

  municipio: MunicipioModel = {
    idMunicipio: 0,
    nombre: '',
    provinciaId: 0
  };

  sucursal: SucursalModel = {
    idSucursal: 0,
    nombre: '',
    municipioId: 0
  };

  bloque: BloqueModel = {
    idBloque: 0,
    nombre: '',
    idSucursal: 0,
    idDireccion: 0
  };

  aula: AulaModel = {
    idAula: 0,
    nombre: '',
    idBloque: 0,
    codigoUbicacion: ''
  };

  direccion: DireccionModel = {
    idDireccion: 0,
    calle: '',
    detalle: '',
    zona: ''
  };
  
  estados$: Observable<EstadosModel[]>; // Observable que contiene los estados
  identificadores$: Observable<IdentificadoresModel[]>; // Observable que contiene los identificadores

  historialActivo: HistorialActivosModel = {
    idHistorial: 0,
    accion: '',
    valorActual: 0,
    fechaModificacion: new Date(),
    comprobante: '',
    detalle: '',
    estado: false,
    estadoUso: '',
    idActivo: 0,
    idAula: 0,
    idCustodio: 0,
    idProyecto: 0,
    idUsuario: 0
  };
  
  activo: ActivosModel = {
    idActivo: 0,
    nombre: '',
    valorActual: 0,
    valorInicial: 0,
    fechaRegistro: new Date(),
    detalle: '',
    estado: true,
    precio: 0,
    comprobanteCompra: '',
    estadoActivo: '',
    aulaId: 0,
    categoriaId: 0,
    custodioId: 0,
    proyectoId: 0,
    idModelo: 0
  };

  ubicacionActivo: UbicacionActivoModel = {
    nombreAula: '',
    nombreBloque: '',
    calleDireccion: '',
    detalleDireccion: '',
    zonaDireccion: '',
    nombreMunicipio: '',
    nombreProvincia: '',
    nombreDepartamento: '',
    nombrePais: '',
    nombreSucursal: ''
  };

  displayedColumns: string[] = [
    'select',
    'accion',
    'fechaModificacion',
    'idUsuario',
    'detalle',
    'estado',
    'estadoUso',
    'idAula',
    'idCustodio',
    'idProyecto',
    'valorActual',
    'comprobante',
    'action'
  ];
  dataSource: MatTableDataSource<HistorialActivosModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<HistorialActivosModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, public calcularDepreciacionService: CalcularDepreciacionService, public csvreportService: CsvreportService, private cdr: ChangeDetectorRef, private _snackBar: MatSnackBar, private activoService: ActivoService) {
    this.aulas$ = this.store.select(AulaState.getAulas);
    this.bloques$ = this.store.select(BloqueState.getBloques);
    this.categorias$ = this.store.select(CategoriaState.getCategorias);
    this.custodios$ = this.store.select(CustodiosState.getCustodios);
    this.depreciaciones$ = this.store.select(DepreciacionState.getDepreciaciones);
    this.estados$ = this.store.select(EstadoState.getEstados);
    this.identificadores$ = this.store.select(IdentificadorState.getIdentificadores);
    this.proyectos$ = this.store.select(ProyectoState.getProyectos);
    this.modelos$ = this.store.select(ModeloState.getModelos);
    this.estadouso$ = this.store.select(EstadoState.getEstados);
    this.activos$ = this.store.select(ActivoState.getActivos);

      
    this.paises$ = this.store.select(PaisState.getPaises);
    this.departamentos$ = this.store.select(DepartamentoState.getDepartamentos);
    this.provincias$ = this.store.select(ProvinciaState.getProvincias);
    this.municipios$ = this.store.select(MunicipioState.getMunicipios);
    this.sucursales$ = this.store.select(SucursalState.getSucursales);
    this.direcciones$ = this.store.select(DireccionState.getDirecciones);

    this.marcas$ = this.store.select(MarcaState.getMarcas);
    this.areas$ = this.store.select(AreasState.getAreas);
    this.historialActivos$ = this.store.select(HistorialActivoState.getHistorialesActivos);

    this.myAngularxQrCode = 'Data QR Vacia';   

  }
  nombreMarca(marcaId: number): string {    
    if (!this.marcas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const marca = this.marcas.find((r) => r.idMarca === marcaId);
    return marca ? marca.nombre : 'Sin Marca';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  private _filter(value: string): ActivosModel[] {
    const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
    let filteredActivos: ActivosModel[] = [];
    
    this.activos$.subscribe((activos: ActivosModel[]) => {
      filteredActivos = activos.filter(activo => activo.nombre.toLowerCase().includes(filterValue));
    }).unsubscribe();
  
    return filteredActivos;
  }

  getIdentificadorByActivoId(id: number): IdentificadoresModel {
    let identificador: IdentificadoresModel = {
      idIdentificador: 0,
      codigoQr: 'sincodigo',
      codigoBarra: 'sincodigo',
      idActivo: 0
    };
    this.identificadores$.subscribe((identificadores: IdentificadoresModel[]) => {
      identificador = identificadores.find(identificador => identificador.idActivo === id) || identificador;
    }).unsubscribe();
    return identificador;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
  
  displayFn(activo: ActivosModel): any {
    return activo && activo.nombre ? activo.nombre : "";
  }

  actualizarListaHistorial(){    
    if(this.activo.idActivo !== 0){    
    this.store.dispatch(new GetHistorialActivoByActivoId(this.activo.idActivo));
    }
  }

  obtenerUbicacionActivo(activo: ActivosModel) {
    this.activoService.getUbicacionActivo(activo.idActivo).subscribe((response) => {
      this.pais.nombre = response.data.nombrePais;
      this.departamento.nombre = response.data.nombreDepartamento;
      this.provincia.nombre = response.data.nombreProvincia;
      this.municipio.nombre = response.data.nombreMunicipio;
      this.sucursal.nombre = response.data.nombreSucursal;
      this.bloque.nombre = response.data.nombreBloque;
      this.aula.nombre = response.data.nombreAula;
      this.direccion.zona = response.data.zonaDireccion;
      this.direccion.calle = response.data.calleDireccion;
      this.direccion.detalle = response.data.detalleDireccion;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarActivo() {
    this.store.dispatch(new UpdateActivo(this.activo)).subscribe({
      next: () => {
        this.openSnackBar('Custodio actualizado correctamente', 'Cerrar');
        this.registrarHistorialActivo();
      },
      error: (error) => {
        console.error('Error al actualizar custodio:', error);
        this.openSnackBar('No se pudo actualizar el custodio', 'Cerrar');
      }
    });
  }

  registrarHistorialActivo() {
    this.historialActivo.idActivo = this.activo.idActivo;
    this.historialActivo.accion = "Actualización";
    this.historialActivo.valorActual = this.activo.valorActual;
    this.historialActivo.fechaModificacion = new Date();
    this.historialActivo.comprobante = this.activo.comprobanteCompra;
    this.historialActivo.estado = true;
    this.historialActivo.estadoUso = this.activo.estadoActivo;
    this.historialActivo.idAula = this.activo.aulaId;
    this.historialActivo.idCustodio = this.activo.custodioId;
    this.historialActivo.idProyecto = this.activo.proyectoId;
    const userId = localStorage.getItem('userId');
    this.historialActivo.idUsuario = userId ? parseInt(userId, 10) : 0;
    this.store.dispatch(new AddHistorialActivo(this.historialActivo)).subscribe({
      next: () => {
        this.openSnackBar('Historial creado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al crear historial:', error + " - " + this.historialActivo.accion + " - " + this.historialActivo.valorActual + " - " + this.historialActivo.fechaModificacion + " - " + this.historialActivo.comprobante + " - " + this.historialActivo.estado + " - " + this.historialActivo.estadoUso + " - " + this.historialActivo.idAula + " - " + this.historialActivo.idCustodio + " - " + this.historialActivo.idProyecto + " - " + this.historialActivo.idUsuario);
        this.openSnackBar('No se pudo crear el historial', 'Cerrar');
      }
    });
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
    //this.pdfreportService.activopdf(activosSeleccionados, this.aulaslist, this.bloqueslist, this.categoriaslist, this.custodioslist, this.depreciacioneslist, this.estadoslist, this.proyectoslist, this.modeloslist, this.areas, this.marcas);
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
    //this.csvreportService.activocsv(activosSeleccionados, this.aulaslist, this.bloqueslist, this.categoriaslist, this.custodioslist, this.depreciacioneslist, this.estadoslist, this.proyectoslist, this.modeloslist, this.areas, this.marcas);
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

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetHistorialActivo() ,new GetArea(), new GetMarca(),
      new GetActivo(), new GetAula(), new GetBloque(), new GetCategoria(), 
      new GetCustodio(), new GetDepreciacion(), new GetEstado(), new GetProyecto(), new GetModelo(),
      new GetPais(), new GetDepartamento(), new GetProvincia(), new GetMunicipio(), new GetSucursal(), new GetDireccion()]);

    // Suscríbete al observable para actualizar el dataSource
    //this.actualizarLista();
    this.historialActivos$.subscribe((activos) => {
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

    this.filteredActivos = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngAfterViewInit() {
    // Configurar la paginación y la ordenación
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Manually trigger change detection
    this.cdr.detectChanges();
  }

  eliminarActivo(id: number) {
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
