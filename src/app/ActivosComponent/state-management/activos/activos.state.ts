import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivoService } from '../../services/activo.service';
import { ActivosModel } from '../../models/activos.model';
import { AddActivo, DeleteActivo, GetActivo, GetActivosByProyectoId, UpdateActivo } from './activos.action';

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
  constructor(private activoService: ActivoService) {}

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
        const state = getState();
        patchState({
            activos: [...state.activos, response.data],
        });
      })
    );
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
