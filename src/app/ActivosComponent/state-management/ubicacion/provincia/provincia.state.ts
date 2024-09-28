import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddProvincia, DeleteProvincia, GetProvincia, UpdateProvincia } from './provincia.actions';
import { ProvinciaModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { ProvinciaService } from 'src/app/ActivosComponent/services/ubicacion/provincia.service';

export interface ProvinciaStateModel {
  provincias: ProvinciaModel[];
}

@State<ProvinciaStateModel>({
  name: 'provincias',
  defaults: {
    provincias: [],
  }
})
@Injectable()
export class ProvinciaState {
  constructor(private provinciaService: ProvinciaService) {}

  // Selector para obtener provincias del estado
  @Selector()
  static getProvincias(state: ProvinciaStateModel) {
    return state.provincias;
  }

  // Acción para obtener las Provincias
  @Action(GetProvincia)
  getProvincias({ patchState }: StateContext<ProvinciaStateModel>) {
    return this.provinciaService.getAllProvincias().pipe(
      tap((response) => {
        patchState({ provincias: response.data });
      })
    );
  }
  
  // Acción para agregar provincia
  @Action(AddProvincia)
  addProvincia({ getState, patchState }: StateContext<ProvinciaStateModel>, { payload }: AddProvincia) {
    return this.provinciaService.addProvincia(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          provincias: [...state.provincias, response.data],
        });
      })
    );
  }

  // Acción para actualizar provincia
  @Action(UpdateProvincia)
  updateProvincia({ getState, setState }: StateContext<ProvinciaStateModel>, { payload }: UpdateProvincia) {
    return this.provinciaService.updateProvincia(payload).pipe(
      tap((response) => {
        const state = getState();
        const provincias = [...state.provincias];
        const index = provincias.findIndex((provincia) => provincia.idProvincia === payload.idProvincia);
        provincias[index] = response.data;
        setState({
          ...state,
          provincias,
        });
      })
    );
  }

  // Acción para eliminar provincia
  @Action(DeleteProvincia)
  deleteProvincia({ getState, setState }: StateContext<ProvinciaStateModel>, { id }: DeleteProvincia) {
    return this.provinciaService.deleteProvincia(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.provincias.filter((provincia) => provincia.idProvincia !== id);
        setState({
          ...state,
          provincias: filteredArray,
        });
      })
    );
  }
}
