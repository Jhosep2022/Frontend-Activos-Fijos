import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ModeloModel } from '../../models/modelo.model';
import { ModeloService } from '../../services/modelo.service';
import { GetModelo, AddModelo, UpdateModelo, DeleteModelo } from './modelo.action';

export interface ModeloStateModel {
  modelos: ModeloModel[];
}

@State<ModeloStateModel>({
  name: 'modelos',
  defaults: {
    modelos: [],
  }
})
@Injectable()
export class ModeloState {
  constructor(private modelosService: ModeloService) {}

  @Selector()
  static getModelos(state: ModeloStateModel) {
    return state.modelos;
  }

  @Action(GetModelo)
  getModelos({ patchState }: StateContext<ModeloStateModel>) {
    return this.modelosService.getAllModelos().pipe(
      tap((response) => {
        patchState({ modelos: response.data });
      })
    );
  }

  @Action(AddModelo)
  addModelo({ getState, patchState }: StateContext<ModeloStateModel>, { payload }: AddModelo) {
    return this.modelosService.addModelo(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          modelos: [...state.modelos, response.data],
        });
      })
    );
  }

  @Action(UpdateModelo)
  updateModelo({ getState, setState }: StateContext<ModeloStateModel>, { payload }: UpdateModelo) {
    return this.modelosService.updateModelo(payload).pipe(
      tap((response) => {
        const state = getState();
        const modelos = [...state.modelos];
        const index = modelos.findIndex((modelo) => modelo.idModelo === payload.idModelo);
        modelos[index] = response.data;
        setState({
          ...state,
          modelos,
        });
      })
    );
  }

  @Action(DeleteModelo)
  deleteModelo({ getState, setState }: StateContext<ModeloStateModel>, { id }: DeleteModelo) {
    return this.modelosService.deleteModelo(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.modelos.filter((modelo) => modelo.idModelo !== id);
        setState({
          ...state,
          modelos: filteredArray,
        });
      })
    );
  }
}
