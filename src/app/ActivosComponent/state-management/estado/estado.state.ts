import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddEstado, DeleteEstado, GetEstado, UpdateEstado } from './estado.action';
import { EstadosModel } from '../../models/estadosUso.model';
import { EstadoUsoService } from '../../services/estado-uso.service';

export interface EstadoStateModel {
  estados: EstadosModel[];
}

@State<EstadoStateModel>({
  name: 'estados',
  defaults: {
    estados: [],
  }
})
@Injectable()
export class EstadoState {
  constructor(private estadoService: EstadoUsoService) {}

  @Selector()
  static getEstados(state: EstadoStateModel) {
    return state.estados;
  }

  @Action(GetEstado)
  getEstados({ patchState }: StateContext<EstadoStateModel>) {
    return this.estadoService.getAllEstados().pipe(
      tap((response) => {
        patchState({ estados: response.data });
      })
    );
  }

  @Action(AddEstado)
  addEstado({ getState, patchState }: StateContext<EstadoStateModel>, { payload }: AddEstado) {
    return this.estadoService.addEstado(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          estados: [...state.estados, response.data],
        });
      })
    );
  }

  @Action(UpdateEstado)
  updateEstado({ getState, setState }: StateContext<EstadoStateModel>, { payload }: UpdateEstado) {
    return this.estadoService.updateEstado(payload).pipe(
      tap((response) => {
        const state = getState();
        const estados = [...state.estados];
        const index = estados.findIndex((estado) => estado.idEstado === payload.id);
        estados[index] = response.data;
        setState({
          ...state,
          estados,
        });
      })
    );
  }

  @Action(DeleteEstado)
  deleteEstado({ getState, setState }: StateContext<EstadoStateModel>, { id }: DeleteEstado) {
    return this.estadoService.deleteEstado(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.estados.filter((estado) => estado.idEstado !== id);
        setState({
          ...state,
          estados: filteredArray,
        });
      })
    );
  }
}
