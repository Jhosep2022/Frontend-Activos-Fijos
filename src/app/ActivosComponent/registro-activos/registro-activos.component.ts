import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivosModel } from '../models/activos.model';
import { AddActivo } from '../state-management/activos/activos.action';
import { Store } from '@ngxs/store';
import { GetAula } from '../state-management/ubicacion/aula/aula.actions';
import { GetBloque } from '../state-management/ubicacion/bloque/bloque.actions';
import { GetCustodio } from '../state-management/custodios/custodios.action';
import { GetProyecto } from '../state-management/proyecto/proyecto.action';
import { map, Observable, startWith } from 'rxjs';
import { AulaModel, BloqueModel, DepartamentoModel, DireccionModel, MunicipioModel, PaisModel, ProvinciaModel, SucursalModel } from '../models/ubicacion.model';
import { CategoriaModel } from '../models/categorias.model';
import { CustodiosState } from '../state-management/custodios/custodios.state';
import { DepreciacionesModel } from '../models/depreciaciones.model';
import { EstadosModel } from '../models/estadosUso.model';
import { IdentificadoresModel } from '../models/identificadores.model';
import { ProyectoModel } from '../models/proyecto.model';
import { AulaState } from '../state-management/ubicacion/aula/aula.state';
import { BloqueState } from '../state-management/ubicacion/bloque/bloque.state';
import { ProyectoState } from '../state-management/proyecto/proyecto.state';
import { CustodiosModel } from '../models/custodios.model';
import { CategoriaState } from '../state-management/categoria/categoria.state';
import { DepreciacionState } from '../state-management/depreciaciones/depreciacion.state';
import { EstadoState } from '../state-management/estado/estado.state';
import { IdentificadorState } from '../state-management/identificadores/identificadores.state';
import { GetCategoria } from '../state-management/categoria/categoria.action';
import { GetDepreciacion } from '../state-management/depreciaciones/depreciacion.action';
import { GetIdentificador } from '../state-management/identificadores/identificadores.action';
import { GetEstado } from '../state-management/estado/estado.action';
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
import { ModeloModel } from '../models/modelo.model';
import { ModeloState } from '../state-management/modelo/modelo.state';
import { GetModelo } from '../state-management/modelo/modelo.action';
import { CsvActivosService } from '../services/csv-activos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcaModel } from '../models/marca.model';
import { MarcaState } from '../state-management/marca/marca.state';
import { GetMarca } from '../state-management/marca/marca.action';
import { FormControl } from '@angular/forms';
import { AreasState } from '../state-management/area/area.state';
import { AreaModel } from '../models/area.model';
import { GetArea } from '../state-management/area/area.action';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';

@Component({
  selector: 'app-registro-activos',
  templateUrl: './registro-activos.component.html',
  styleUrls: ['./registro-activos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroActivosComponent implements AfterViewInit {

  // Variables para el manejo de los campos de autocompletado
  areas$: Observable<AreaModel[]>; 
  areas: AreaModel[] = [];
  
  filteredActivos!: Observable<ActivosModel[]>;
  filteredProyectos!: Observable<ProyectoModel[]>;
  myControl = new FormControl('');  
  
  filteredCustodios!: Observable<CustodiosModel[]>;
  myControlCustodios = new FormControl('');  
  
  filteredModelos!: Observable<ModeloModel[]>;
  myControlModelos = new FormControl('');  
  
  filteredSucursales!: Observable<SucursalModel[]>;
  myControlSucursales = new FormControl('');  
  
  filteredDirecciones!: Observable<DireccionModel[]>;
  myControlDirecciones = new FormControl('');  
  
  filteredAulas!: Observable<AulaModel[]>;
  myControlAulas = new FormControl('');  
  
  filteredBloques!: Observable<BloqueModel[]>;
  myControlBloques = new FormControl('');  

  proyecto: ProyectoModel = {
    idProyecto: 0,
    nombre: '',
    codigoProyecto: '',
    fechaInicio: '',
    fechaFin: '',
    idArea: 0
  };

  custodio: CustodiosModel = {
    idCustodio: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: '',
    ci: ''
  };

  modelo: ModeloModel = {
    idModelo: 0,
    nombre: '',
    marcaId: 0,
    descripcion: '',
    estado: false
  }
  // Variables para el manejo de archivos
  selectedFile: File | null = null;
  
  modelos$: Observable<ModeloModel[]>;
  paises$: Observable<PaisModel[]>;  
  departamentos$: Observable<DepartamentoModel[]>;
  provincias$: Observable<ProvinciaModel[]>;
  municipios$: Observable<MunicipioModel[]>;
  sucursales$: Observable<SucursalModel[]>;
  bloques$: Observable<BloqueModel[]>;
  aulas$: Observable<AulaModel[]>;
  direcciones$: Observable<DireccionModel[]>;

  marcas$: Observable<MarcaModel[]>; 
  marcas: MarcaModel[] = [];
  sucursales: SucursalModel[] = [];

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

  sucursal2: SucursalModel = {
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

  bloque2: BloqueModel = {
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

  aula2: AulaModel = {
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
  
  direccion2: DireccionModel = {
    idDireccion: 0,
    calle: '',
    detalle: '',
    zona: ''
  };

  categorias$: Observable<CategoriaModel[]>; // Observable que contiene los categorias
  custodios$: Observable<CustodiosModel[]>; // Observable que contiene los custodios
  depreciaciones$: Observable<DepreciacionesModel[]>; // Observable que contiene los depreciaciones
  estados$: Observable<EstadosModel[]>; // Observable que contiene los estados
  identificadores$: Observable<IdentificadoresModel[]>; // Observable que contiene los identificadores
  proyectos$: Observable<ProyectoModel[]>; // Observable que contiene los proyectos

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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getAreaName(areaId: number): string {
    if (!this.areas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const area = this.areas.find((r) => r.idArea === areaId);
    return area ? area.nombre : 'Sin Area';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  agregarActivos(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        response => {
          if (response.success) {
            console.log('Archivo cargado correctamente:', response.data);
            this.openSnackBar('Archivo cargado correctamente', 'Cerrar');
          } else {
            console.error('Error al cargar el archivo:', response.message);
            this.openSnackBar('Error al cargar el archivo', 'Cerrar');
          }
        },
        error => {
          console.error('Error en la solicitud:', error);
          this.openSnackBar('El Archivo no se pudo subir', 'Cerrar');
        }
      );
    } else {
      console.warn('Por favor, selecciona un archivo antes de cargarlo.');
    }
  }

  agregarActivo() {
    this.activo.custodioId = this.custodio.idCustodio;
    this.activo.proyectoId = this.proyecto.idProyecto;
    this.activo.idModelo = this.modelo.idModelo;

    this.activo.valorActual = this.activo.valorInicial;
    this.store.dispatch(new AddActivo(this.activo)).subscribe({
      next: () => {
        this.openSnackBar('Activo agregado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al registrar activo:', error);
        this.openSnackBar('El Activo no se pudo agregar', 'Cerrar');
      }
    });
    this.activo = {
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
  }

  nombreMarca(marcaId: number): string {    
    if (!this.marcas.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const marca = this.marcas.find((r) => r.idMarca === marcaId);
    return marca ? marca.nombre : 'Sin Marca';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  //sidebar menu activation start
  menuSidebarActive:boolean=false;
  myfunction(){
    if(this.menuSidebarActive==false){
      this.menuSidebarActive=true;
    }
    else {
      this.menuSidebarActive=false;
    }
  }
  //sidebar menu activation end
  
  hide = true;
  
    constructor(private cdr: ChangeDetectorRef, private store: Store, public fileUploadService: CsvActivosService, private _snackBar: MatSnackBar, public dialogsAccessService: DialogsAccessService) {
      this.aulas$ = this.store.select(AulaState.getAulas);
      this.bloques$ = this.store.select(BloqueState.getBloques);
      this.categorias$ = this.store.select(CategoriaState.getCategorias);
      this.custodios$ = this.store.select(CustodiosState.getCustodios);
      this.depreciaciones$ = this.store.select(DepreciacionState.getDepreciaciones);
      this.estados$ = this.store.select(EstadoState.getEstados);
      this.identificadores$ = this.store.select(IdentificadorState.getIdentificadores);
      this.proyectos$ = this.store.select(ProyectoState.getProyectos);
      this.modelos$ = this.store.select(ModeloState.getModelos);

      
      this.paises$ = this.store.select(PaisState.getPaises);
      this.departamentos$ = this.store.select(DepartamentoState.getDepartamentos);
      this.provincias$ = this.store.select(ProvinciaState.getProvincias);
      this.municipios$ = this.store.select(MunicipioState.getMunicipios);
      this.sucursales$ = this.store.select(SucursalState.getSucursales);
      this.direcciones$ = this.store.select(DireccionState.getDirecciones);

      this.marcas$ = this.store.select(MarcaState.getMarcas);
      this.areas$ = this.store.select(AreasState.getAreas);
     }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

     //Funciones para el filtro de los campos de autocompletado

     private _filter(value: string): ProyectoModel[] {
       const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
       let filteredProyectos: ProyectoModel[] = [];
       
       this.proyectos$.subscribe((proyectos: ProyectoModel[]) => {
         filteredProyectos = proyectos.filter(proyectos => proyectos.nombre.toLowerCase().includes(filterValue));
       }).unsubscribe();
     
       return filteredProyectos;
     }
     
     displayFn(activo: ActivosModel): any {
       return activo && activo.nombre ? activo.nombre : "";
     }

     private _filterModelo(value: string): ModeloModel[] {
       const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
       let filteredModelos: ModeloModel[] = [];
       
       this.modelos$.subscribe((modelos: ModeloModel[]) => {
        filteredModelos = modelos.filter(modelos => modelos.nombre.toLowerCase().includes(filterValue));
       }).unsubscribe();
     
       return filteredModelos;
     }
     
     displayFnModelo(activo: ActivosModel): any {
       return activo && activo.nombre ? activo.nombre : "";
     }

     private _filterCustodio(value: string): CustodiosModel[] {
       const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
       let filteredData: CustodiosModel[] = [];
       
       this.custodios$.subscribe((data: CustodiosModel[]) => {
        filteredData = data.filter(data => data.nombre.toLowerCase().includes(filterValue));
       }).unsubscribe();
     
       return filteredData;
     }
     
     displayFnCustodio(activo: ActivosModel): any {
       return activo && activo.nombre ? activo.nombre : "";
     }

     private _filterSucursal(value: string): SucursalModel[] {
       const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
       let filteredData: SucursalModel[] = [];
       
       this.sucursales$.subscribe((data: SucursalModel[]) => {
        filteredData = data.filter(data => data.nombre.toLowerCase().includes(filterValue));
       }).unsubscribe();
     
       return filteredData;
     }
     
     displayFnSucursal(activo: ActivosModel): string {
      return activo && activo.nombre ? activo.nombre : "";
    }
    
     private _filterDireccion(value: string): DireccionModel[] {
       const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
       let filteredData: DireccionModel[] = [];
       
       this.direcciones$.subscribe((data: DireccionModel[]) => {
        filteredData = data.filter(data => data.zona.toLowerCase().includes(filterValue));
       }).unsubscribe();
     
       return filteredData;
     }
     
     displayFnDireccion(activo: DireccionModel): any {
       return activo && activo.zona ? activo.zona+" - "+activo.calle+" - "+activo.detalle : "";
     }

     private _filterAula(value: string): AulaModel[] {
       const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
       let filteredData: AulaModel[] = [];
       
       this.aulas$.subscribe((data: AulaModel[]) => {
        filteredData = data.filter(data => data.nombre.toLowerCase().includes(filterValue));
       }).unsubscribe();
     
       return filteredData;
     }
     
     displayFnAula(activo: ActivosModel): any {
       return activo && activo.nombre ? activo.nombre : "";
     }

     private _filterBloque(value: string): BloqueModel[] {
        const filterValue = value?.toString().toLowerCase();  // Asegurarse de que siempre sea una cadena
        let filteredData: BloqueModel[] = [];
        
        this.bloques$.subscribe((data: BloqueModel[]) => {
          filteredData = data.filter(data => data.nombre.toLowerCase().includes(filterValue));
        }).unsubscribe();
      
        return filteredData;
      }
     
      displayFnBloque(activo: ActivosModel): any {
        return activo && activo.nombre ? activo.nombre : "";
      }
      onSucursalChange(activo: SucursalModel) {
        this.bloque.idSucursal = activo.idSucursal;
      }
      onBloqueChange(activo: BloqueModel) {
        this.aula.idBloque = activo.idBloque;
      }
      onDireccionChange(activo: DireccionModel) {
        this.bloque.idDireccion = activo.idDireccion;
      }
      onaulaChange(activo: AulaModel) {
        this.activo.aulaId = activo.idAula;
      }
      
  //--------------------------------------------------------------------------------
    ngOnInit(): void {
      this.store.dispatch([new GetMarca() ,new GetAula(), new GetBloque(), new GetCustodio(), new GetProyecto(), new GetCategoria(), new GetDepreciacion(), new GetIdentificador(), new GetEstado(),new GetPais(), new GetDepartamento(), new GetProvincia(), new GetMunicipio(), new GetSucursal(), new GetDireccion(), new GetDepreciacion(), new GetModelo(), new GetArea()]);
      
      this.marcas$.subscribe((marcas) => {
        this.marcas = marcas;
      });

      this.sucursales$.subscribe((sucursales) => {
        this.sucursales = sucursales;
      });

      this.filteredProyectos = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.filteredCustodios = this.myControlCustodios.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCustodio(value || '')),
      );

      this.filteredModelos = this.myControlModelos.valueChanges.pipe(
        startWith(''),
        map(value => this._filterModelo(value || '')),
      );

      this.filteredSucursales = this.myControlSucursales.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSucursal(value || '')),
      );

      this.filteredDirecciones = this.myControlDirecciones.valueChanges.pipe(
        startWith(''),
        map(value => this._filterDireccion(value || '')),
      );

      this.filteredAulas = this.myControlAulas.valueChanges.pipe(
        startWith(''),
        map(value => this._filterAula(value || '')),
      );

      this.filteredBloques = this.myControlBloques.valueChanges.pipe(
        startWith(''),
        map(value => this._filterBloque(value || '')),
      );

      this.areas$.subscribe((areas) => {
        this.areas = areas;
      });

      this.sucursal2 = this.sucursal;
      this.bloque2 = this.bloque;
      this.direccion2 = this.direccion;
      this.aula2 = this.aula;
    }
  
  }
  