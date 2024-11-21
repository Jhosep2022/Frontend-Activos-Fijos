import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivoService } from '../../services/activo.service';
import { ActivosModel } from '../../models/activos.model';
import { AddActivo, DeleteActivo, GetActivo, GetActivosByProyectoId, UpdateActivo } from './activos.action';
import { IdentificadoresModel } from '../../models/identificadores.model';
import { AddIdentificador } from '../identificadores/identificadores.action';
import { Observable } from 'rxjs';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectoState } from '../proyecto/proyecto.state';

export interface ActivoStateModel {
  activos: ActivosModel[];
}

@State<ActivoStateModel>({
  name: 'activos',
  defaults: {
    activos: [],
  }
})
@Injectable()
export class ActivoState {
  proyectos$: Observable<ProyectoModel[]>;
  proyectos: ProyectoModel[] = [];
  constructor(private activoService: ActivoService, private store: Store) {
    this.proyectos$ = this.store.select(ProyectoState.getProyectos);
  }

  proyecto: ProyectoModel = {
    idProyecto: 0,
    nombre: '',
    codigoProyecto: '',
    fechaInicio: '',
    fechaFin: '',
    idArea: 0
  };

  getProyectoName(rolId: number): string {
    this.proyectos$.subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
    if (!this.proyectos.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const proyecto = this.proyectos.find((r) => r.idProyecto === rolId);
    return proyecto ? (proyecto.codigoProyecto) : 'Sin Proyecto';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  // Selector para obtener activos del estado
  @Selector()
  static getActivos(state: ActivoStateModel) {
    return state.activos;
  }

  // Acción para obtener los activos
  @Action(GetActivo)
  getActivos({ patchState }: StateContext<ActivoStateModel>) {
    return this.activoService.getAllActivos().pipe(
      tap((response) => {
        patchState({ activos: response.data });
      })
    );
  }

  @Action(GetActivosByProyectoId)
  getProductosByCategoriaId(
    { patchState }: StateContext<ActivoStateModel>,
    { proyectoId }: GetActivosByProyectoId
  ) {
    return this.activoService.getActivoByProyectoId(proyectoId).pipe(
      tap((response) => {
        patchState({ activos: response.data });
      })
    );
  }

  // Acción para agregar activo
  @Action(AddActivo)
  addActivo({ getState, patchState }: StateContext<ActivoStateModel>, { payload }: AddActivo) {
    return this.activoService.addActivo(payload).pipe(
      tap((response) => {
        this.crearPermisoinicial(response.data);
        const state = getState();
        patchState({
            activos: [...state.activos, response.data],
        });
      })
    );
  }

  crearPermisoinicial(activo: ActivosModel) {
    let identificador: IdentificadoresModel = {
      idIdentificador: 0,
      codigoQr: '',
      codigoBarra: '',
      idActivo: 0
    }    
    identificador.idActivo = activo.idActivo;
    identificador.codigoQr = this.generarCodigoIdentificador(activo);
    identificador.codigoBarra = this.generarCodigoIdentificador(activo);

    this.store.dispatch(new AddIdentificador(identificador)).subscribe({
      next: (response) => {
        console.log('Identificador agregar exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar Identificador:', error);
      }
    });
  }

  generarCodigoIdentificador(activo: ActivosModel): string {
    let codigo = 'AAAAZXYM';
    codigo = codigo.replace('AAAA', this.getProyectoName(activo.proyectoId))
    .replace('Z', activo.idActivo.toString())
    .replace('X', activo.idModelo.toString())
    .replace('Y', activo.categoriaId.toString())
    .replace('M', activo.proyectoId.toString());
    
    return codigo;
  }

  // Acción para actualizar activo
  @Action(UpdateActivo)
  updateActivo({ getState, setState }: StateContext<ActivoStateModel>, { payload }: UpdateActivo) {
    return this.activoService.updateActivo(payload).pipe(
      tap((response) => {
        const state = getState();
        const activos = [...state.activos];
        const index = activos.findIndex((activo) => activo.idActivo === payload.idActivo);
        activos[index] = response.data;
        setState({
          ...state,
          activos,
        });
      })
    );
  }

  // Acción para eliminar activo
  @Action(DeleteActivo)
  deleteActivo({ getState, setState }: StateContext<ActivoStateModel>, { id }: DeleteActivo) {
    return this.activoService.deleteActivo(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.activos.filter((activo) => activo.idActivo !== id);
        setState({
          ...state,
          activos: filteredArray,
        });
      })
    );
  }
}
