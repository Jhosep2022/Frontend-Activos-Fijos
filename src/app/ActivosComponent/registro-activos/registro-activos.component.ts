import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivosModel } from '../models/activos.model';
import { AddActivo } from '../state-management/activos/activos.action';
import { Store } from '@ngxs/store';
import { GetAula } from '../state-management/ubicacion/aula/aula.actions';
import { GetBloque } from '../state-management/ubicacion/bloque/bloque.actions';
import { GetCustodio } from '../state-management/custodios/custodios.action';
import { GetProyecto } from '../state-management/proyecto/proyecto.action';
import { Observable } from 'rxjs';
import { AulaModel, BloqueModel } from '../models/ubicacion.model';
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

@Component({
  selector: 'app-registro-activos',
  templateUrl: './registro-activos.component.html',
  styleUrls: ['./registro-activos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroActivosComponent implements OnInit {
  aulas$: Observable<AulaModel[]>; // Observable que contiene los aulas
  bloques$: Observable<BloqueModel[]>; // Observable que contiene los bloques
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
    estado: false,
    precio: 0,
    comprobanteCompra: '',
    idAula: 0,
    idBloque: 0,
    idCategoria: 0,
    idCustodio: 0,
    idDepreciacion: 0,
    idEstadoactivo: 0,
    idIdentificador: 0,
    idProyecto: 0
  };

  agregarActivo() {
    this.store.dispatch(new AddActivo(this.activo));
    this.activo = {
      idActivo: 0,
      nombre: '',
      valorActual: 0,
      valorInicial: 0,
      fechaRegistro: new Date(),
      detalle: '',
      estado: false,
      precio: 0,
      comprobanteCompra: '',
      idAula: 0,
      idBloque: 0,
      idCategoria: 0,
      idCustodio: 0,
      idDepreciacion: 0,
      idEstadoactivo: 0,
      idIdentificador: 0,
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
     }
  
    ngOnInit(): void {
      this.store.dispatch([new GetAula(), new GetBloque(), new GetCustodio(), new GetProyecto()]);
    }
  
  }
  