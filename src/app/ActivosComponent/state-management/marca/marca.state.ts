import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MarcaModel } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service';
import { AddMarca, DeleteMarca, GetMarca, UpdateMarca } from './marca.action';

export interface MarcaStateModel {
  marcas: MarcaModel[];
}

@State<MarcaStateModel>({
  name: 'marcas',
  defaults: {
    marcas: [],
  }
})
@Injectable()
export class MarcaState {
  constructor(private marcasService: MarcaService) {}

  @Selector()
  static getMarcas(state: MarcaStateModel) {
    return state.marcas;
  }

  @Action(GetMarca)
  getMarcas({ patchState }: StateContext<MarcaStateModel>) {
    return this.marcasService.getAllMarcas().pipe(
      tap((response) => {
        patchState({ marcas: response.data });
      })
    );
  }

  @Action(AddMarca)
  addMarca({ getState, patchState }: StateContext<MarcaStateModel>, { payload }: AddMarca) {
    return this.marcasService.addMarca(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          marcas: [...state.marcas, response.data],
        });
      })
    );
  }

  @Action(UpdateMarca)
  updateMarca({ getState, setState }: StateContext<MarcaStateModel>, { payload }: UpdateMarca) {
    return this.marcasService.updateMarca(payload).pipe(
      tap((response) => {
        const state = getState();
        const marcas = [...state.marcas];
        const index = marcas.findIndex((marca) => marca.idMarca === payload.idMarca);
        marcas[index] = response.data;
        setState({
          ...state,
          marcas,
        });
      })
    );
  }

  @Action(DeleteMarca)
  deleteMarca({ getState, setState }: StateContext<MarcaStateModel>, { id }: DeleteMarca) {
    return this.marcasService.deleteMarca(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.marcas.filter((marca) => marca.idMarca !== id);
        setState({
          ...state,
          marcas: filteredArray,
        });
      })
    );
  }
}
