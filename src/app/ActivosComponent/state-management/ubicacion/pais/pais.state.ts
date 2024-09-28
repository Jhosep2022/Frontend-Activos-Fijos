import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddPais, DeletePais, GetPais, UpdatePais } from './pais.actions';
import { PaisModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { PaisService } from 'src/app/ActivosComponent/services/ubicacion/pais.service';

export interface PaisStateModel {
  paises: PaisModel[];
}

@State<PaisStateModel>({
  name: 'paises',
  defaults: {
    paises: [],
  }
})
@Injectable()
export class PaisState {
  constructor(private paisService: PaisService) {}

  // Selector para obtener países del estado
  @Selector()
  static getPaises(state: PaisStateModel) {
    return state.paises;
  }

  // Acción para obtener los Países
  @Action(GetPais)
  getPaises({ patchState }: StateContext<PaisStateModel>) {
    return this.paisService.getAllPaises().pipe(
      tap((response) => {
        patchState({ paises: response.data });
      })
    );
  }

  // Acción para agregar país
  @Action(AddPais)
  addPais({ getState, patchState }: StateContext<PaisStateModel>, { payload }: AddPais) {
    return this.paisService.addPais(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          paises: [...state.paises, response.data],
        });
      })
    );
  }

  // Acción para actualizar país
  @Action(UpdatePais)
  updatePais({ getState, setState }: StateContext<PaisStateModel>, { payload }: UpdatePais) {
    return this.paisService.updatePais(payload).pipe(
      tap((response) => {
        const state = getState();
        const paises = [...state.paises];
        const index = paises.findIndex((pais) => pais.idPais === payload.idPais);
        paises[index] = response.data;
        setState({
          ...state,
          paises,
        });
      })
    );
  }

  // Acción para eliminar país
  @Action(DeletePais)
  deletePais({ getState, setState }: StateContext<PaisStateModel>, { id }: DeletePais) {
    return this.paisService.deletePais(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.paises.filter((paises) => paises.idPais !== id);
        setState({
          ...state,
          paises: filteredArray,
        });
      })
    );
  }
}
