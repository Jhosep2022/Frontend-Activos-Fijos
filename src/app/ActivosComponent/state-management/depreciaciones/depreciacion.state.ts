import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DepreciacionService } from '../../services/depreciacion.service';
import { AddDepreciacion, DeleteDepreciacion, GetDepreciacion, UpdateDepreciacion } from './depreciacion.action';
import { DepreciacionesModel } from '../../models/depreciaciones.model';

export interface DepreciacionStateModel {
  depreciaciones: DepreciacionesModel[];
}

@State<DepreciacionStateModel>({
  name: 'depreciaciones',
  defaults: {
    depreciaciones: [],
  }
})
@Injectable()
export class DepreciacionState {
  constructor(private depreciacionService: DepreciacionService) {}

  @Selector()
  static getDepreciaciones(state: DepreciacionStateModel) {
    return state.depreciaciones;
  }

  @Action(GetDepreciacion)
  getDepreciaciones({ patchState }: StateContext<DepreciacionStateModel>) {
    return this.depreciacionService.getAllDepreciaciones().pipe(
      tap((response) => {
        patchState({ depreciaciones: response.data });
      })
    );
  }

  @Action(AddDepreciacion)
  addDepreciacion({ getState, patchState }: StateContext<DepreciacionStateModel>, { payload }: AddDepreciacion) {
    return this.depreciacionService.addDepreciacion(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          depreciaciones: [...state.depreciaciones, response.data],
        });
      })
    );
  }

  @Action(UpdateDepreciacion)
  updateDepreciacion({ getState, setState }: StateContext<DepreciacionStateModel>, { payload }: UpdateDepreciacion) {
    return this.depreciacionService.updateDepreciacion(payload).pipe(
      tap((response) => {
        const state = getState();
        const depreciaciones = [...state.depreciaciones];
        const index = depreciaciones.findIndex((depreciacion) => depreciacion.idDepreciacion === payload.id);
        depreciaciones[index] = response.data;
        setState({
          ...state,
          depreciaciones,
        });
      })
    );
  }

  @Action(DeleteDepreciacion)
  deleteDepreciacion({ getState, setState }: StateContext<DepreciacionStateModel>, { id }: DeleteDepreciacion) {
    return this.depreciacionService.deleteDepreciacion(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.depreciaciones.filter((depreciacion) => depreciacion.idDepreciacion !== id);
        setState({
          ...state,
          depreciaciones: filteredArray,
        });
      })
    );
  }
}
