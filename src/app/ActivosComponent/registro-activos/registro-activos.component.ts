import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivosModel } from '../models/activos.model';
import { AddActivo } from '../state-management/activos/activos.action';
import { Store } from '@ngxs/store';
import { GetAula } from '../state-management/ubicacion/aula/aula.actions';
import { GetBloque } from '../state-management/ubicacion/bloque/bloque.actions';
import { GetCustodio } from '../state-management/custodios/custodios.action';
import { GetProyecto } from '../state-management/proyecto/proyecto.action';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-registro-activos',
  templateUrl: './registro-activos.component.html',
  styleUrls: ['./registro-activos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroActivosComponent implements OnInit {
  
  paises$: Observable<PaisModel[]>;  
  departamentos$: Observable<DepartamentoModel[]>;
  provincias$: Observable<ProvinciaModel[]>;
  municipios$: Observable<MunicipioModel[]>;
  sucursales$: Observable<SucursalModel[]>;
  bloques$: Observable<BloqueModel[]>;
  aulas$: Observable<AulaModel[]>;
  direcciones$: Observable<DireccionModel[]>;

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
    idBloque: 0
  };

  direccion: DireccionModel = {
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
    idAula: 0,
    idBloque: 0,
    idCategoria: 0,
    idCustodio: 0,
    idDepreciacion: 2,
    idEstadoactivo: 0,
    idIdentificador: 2,
    idProyecto: 0
  };

  agregarActivo() {
    this.store.dispatch(new AddActivo(this.activo)).subscribe({
      next: () => {
        console.log('Activo registrado exitosamente');
      },
      error: (error) => {
        console.error('Error al registrar activo:', error);
        alert('Hubo un error al registrar el activo, intente de nuevo.');
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
      idAula: 0,
      idBloque: 0,
      idCategoria: 0,
      idCustodio: 0,
      idDepreciacion: 2,
      idEstadoactivo: 0,
      idIdentificador: 2,
      idProyecto: 0
    };
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
  
    constructor(private store: Store) {
      this.aulas$ = this.store.select(AulaState.getAulas);
      this.bloques$ = this.store.select(BloqueState.getBloques);
      this.categorias$ = this.store.select(CategoriaState.getCategorias);
      this.custodios$ = this.store.select(CustodiosState.getCustodios);
      this.depreciaciones$ = this.store.select(DepreciacionState.getDepreciaciones);
      this.estados$ = this.store.select(EstadoState.getEstados);
      this.identificadores$ = this.store.select(IdentificadorState.getIdentificadores);
      this.proyectos$ = this.store.select(ProyectoState.getProyectos);

      
      this.paises$ = this.store.select(PaisState.getPaises);
      this.departamentos$ = this.store.select(DepartamentoState.getDepartamentos);
      this.provincias$ = this.store.select(ProvinciaState.getProvincias);
      this.municipios$ = this.store.select(MunicipioState.getMunicipios);
      this.sucursales$ = this.store.select(SucursalState.getSucursales);
      this.direcciones$ = this.store.select(DireccionState.getDirecciones);
     }
  
    ngOnInit(): void {
      this.store.dispatch([new GetAula(), new GetBloque(), new GetCustodio(), new GetProyecto(), new GetCategoria(), new GetDepreciacion(), new GetIdentificador(), new GetEstado(),new GetPais(), new GetDepartamento(), new GetProvincia(), new GetMunicipio(), new GetSucursal(), new GetDireccion()]);
    }
  
  }
  