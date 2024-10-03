import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AulaModel, BloqueModel, DepartamentoModel, DireccionModel, MunicipioModel, PaisModel, ProvinciaModel, SucursalModel } from '../models/ubicacion.model';
import { AddPais, DeletePais, GetPais } from '../state-management/ubicacion/pais/pais.actions';
import { AddDepartamento, DeleteDepartamento, GetDepartamento } from '../state-management/ubicacion/departamento/departamento.actions';
import { AddProvincia, DeleteProvincia, GetProvincia } from '../state-management/ubicacion/provincia/provincia.actions';
import { AddMunicipio, DeleteMunicipio, GetMunicipio } from '../state-management/ubicacion/municipio/municipio.actions';
import { AddSucursal, DeleteSucursal, GetSucursal } from '../state-management/ubicacion/sucursal/sucursal.actions';
import { AddBloque, DeleteBloque, GetBloque } from '../state-management/ubicacion/bloque/bloque.actions';
import { AddAula, DeleteAula, GetAula } from '../state-management/ubicacion/aula/aula.actions';
import { AddDireccion, DeleteDireccion, GetDireccion } from '../state-management/ubicacion/direccion/direccion.actions';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PaisState } from '../state-management/ubicacion/pais/pais.state';
import { DepartamentoState } from '../state-management/ubicacion/departamento/departamento.state';
import { ProvinciaState } from '../state-management/ubicacion/provincia/provincia.state';
import { MunicipioState } from '../state-management/ubicacion/municipio/municipio.state';
import { SucursalState } from '../state-management/ubicacion/sucursal/sucursal.state';
import { BloqueState } from '../state-management/ubicacion/bloque/bloque.state';
import { AulaState } from '../state-management/ubicacion/aula/aula.state';
import { DireccionState } from '../state-management/ubicacion/direccion/direccion.state';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';

@Component({
  selector: 'app-gestion-ubicaciones',
  templateUrl: './gestion-ubicaciones.component.html',
  styleUrls: ['./gestion-ubicaciones.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionUbicacionesComponent implements OnInit {
  
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

  eliminarPais(id: number) {
    this.store.dispatch(new DeletePais(id));
  }

  eliminarDepartamento(id: number) {
    this.store.dispatch(new DeleteDepartamento(id));
  }

  eliminarProvincia(id: number) {
    this.store.dispatch(new DeleteProvincia(id));
  }

  eliminarMunicipio(id: number) {
    this.store.dispatch(new DeleteMunicipio(id));
  }

  eliminarSucursal(id: number) {
    this.store.dispatch(new DeleteSucursal(id));
  }

  eliminarBloque(id: number) {
    this.store.dispatch(new DeleteBloque(id));
  }

  eliminarAula(id: number) {
    this.store.dispatch(new DeleteAula(id));
  }

  eliminarDireccion(id: number) {
    this.store.dispatch(new DeleteDireccion(id));
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
  
    constructor(private store: Store, public dialogsAccessService: DialogsAccessService) {
      this.paises$ = this.store.select(PaisState.getPaises);
      this.departamentos$ = this.store.select(DepartamentoState.getDepartamentos);
      this.provincias$ = this.store.select(ProvinciaState.getProvincias);
      this.municipios$ = this.store.select(MunicipioState.getMunicipios);
      this.sucursales$ = this.store.select(SucursalState.getSucursales);
      this.bloques$ = this.store.select(BloqueState.getBloques);
      this.aulas$ = this.store.select(AulaState.getAulas);
      this.direcciones$ = this.store.select(DireccionState.getDirecciones);
    }
  
    ngOnInit(): void {
      // Despacha la acción para obtener los roles
      this.store.dispatch([new GetPais(), new GetDepartamento(), new GetProvincia(), new GetMunicipio(), new GetSucursal(), new GetBloque(), new GetAula(), new GetDireccion()]);
    }
  
  }
  