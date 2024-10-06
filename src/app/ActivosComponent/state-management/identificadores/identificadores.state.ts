import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddIdentificador, DeleteIdentificador, GetIdentificador, UpdateIdentificador } from './identificadores.action';
import { IdentificadoresService } from '../../services/identificadores.service';
import { IdentificadoresModel } from '../../models/identificadores.model';

export interface IdentificadorStateModel {
  identificadores: IdentificadoresModel[];
}

@State<IdentificadorStateModel>({
  name: 'identificadores',
  defaults: {
    identificadores: [],
  }
})
@Injectable()
export class IdentificadorState {
  constructor(private identificadorService: IdentificadoresService) {}

  @Selector()
  static getIdentificadores(state: IdentificadorStateModel) {
    return state.identificadores;
  }

  @Action(GetIdentificador)
  getIdentificadores({ patchState }: StateContext<IdentificadorStateModel>) {
    return this.identificadorService.getAllIdentificadores().pipe(
      tap((response) => {
        patchState({ identificadores: response.data });
      })
    );
  }

  @Action(AddIdentificador)
  addIdentificador({ getState, patchState }: StateContext<IdentificadorStateModel>, { payload }: AddIdentificador) {
    return this.identificadorService.addIdentificador(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          identificadores: [...state.identificadores, response.data],
        });
      })
    );
  }

  @Action(UpdateIdentificador)
  updateIdentificador({ getState, setState }: StateContext<IdentificadorStateModel>, { payload }: UpdateIdentificador) {
    return this.identificadorService.updateIdentificador(payload).pipe(
      tap((response) => {
        const state = getState();
        const identificadores = [...state.identificadores];
        const index = identificadores.findIndex((identificador) => identificador.idIdentificador === payload.id);
        identificadores[index] = response.data;
        setState({
          ...state,
          identificadores,
        });
      })
    );
  }

  @Action(DeleteIdentificador)
  deleteIdentificador({ getState, setState }: StateContext<IdentificadorStateModel>, { id }: DeleteIdentificador) {
    return this.identificadorService.deleteIdentificador(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.identificadores.filter((identificador) => identificador.idIdentificador !== id);
        setState({
          ...state,
          identificadores: filteredArray,
        });
      })
    );
  }
}
