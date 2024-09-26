import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CustodiosModel } from '../../models/custodios.model';
import { CustodioService } from '../../services/custodio.service';
import { AddCustodio, DeleteCustodio, GetCustodio, UpdateCustodio } from './custodios.action';

export interface CustodiosStateModel {
  custodios: CustodiosModel[];
}

@State<CustodiosStateModel>({
  name: 'custodios',
  defaults: {
    custodios: [],
  }
})
@Injectable()
export class CustodiosState {
  constructor(private custodiosService: CustodioService) {}

  // Selector para obtener custodios del estado
  @Selector()
  static getCustodios(state: CustodiosStateModel) {
    return state.custodios;
  }

  // Acción para obtener los custodios
  @Action(GetCustodio)
  getCustodios({ patchState }: StateContext<CustodiosStateModel>) {
    return this.custodiosService.getAllCustodios().pipe(
      tap((response) => {
        patchState({ custodios: response.data });
      })
    );
  }

  // Acción para agregar un custodio
  @Action(AddCustodio)
  addCustodio({ getState, patchState }: StateContext<CustodiosStateModel>, { payload }: AddCustodio) {
    return this.custodiosService.addCustodio(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          custodios: [...state.custodios, response.data],
        });
      })
    );
  }

  // Acción para actualizar un custodio
  @Action(UpdateCustodio)
  updateCustodio({ getState, setState }: StateContext<CustodiosStateModel>, { payload }: UpdateCustodio) {
    return this.custodiosService.updateCustodio(payload).pipe(
      tap((response) => {
        const state = getState();
        const custodios = [...state.custodios];
        const index = custodios.findIndex((custodio) => custodio.idCustodio === payload.id);
        custodios[index] = response.data;
        setState({
          ...state,
          custodios,
        });
      })
    );
  }

  // Acción para eliminar un custodio
  @Action(DeleteCustodio)
  deleteCustodio({ getState, setState }: StateContext<CustodiosStateModel>, { id }: DeleteCustodio) {
    return this.custodiosService.deleteCustodio(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.custodios.filter((custodio) => custodio.idCustodio !== id);
        setState({
          ...state,
          custodios: filteredArray,
        });
      })
    );
  }
}
