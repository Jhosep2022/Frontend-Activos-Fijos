import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddMunicipio, DeleteMunicipio, GetMunicipio, UpdateMunicipio } from './municipio.actions';
import { MunicipioModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { MunicipioService } from 'src/app/ActivosComponent/services/ubicacion/municipio.service';

export interface MunicipioStateModel {
  municipios: MunicipioModel[];
}

@State<MunicipioStateModel>({
  name: 'municipios',
  defaults: {
    municipios: [],
  }
})
@Injectable()
export class MunicipioState {
  constructor(private municipioService: MunicipioService) {}

  // Selector para obtener municipios del estado
  @Selector()
  static getMunicipios(state: MunicipioStateModel) {
    return state.municipios;
  }

  // Acción para obtener los Municipios
  @Action(GetMunicipio)
  getMunicipios({ patchState }: StateContext<MunicipioStateModel>) {
    return this.municipioService.getAllMunicipios().pipe(
      tap((response) => {
        patchState({ municipios: response.data });
      })
    );
  }

  // Acción para agregar municipio
  @Action(AddMunicipio)
  addMunicipio({ getState, patchState }: StateContext<MunicipioStateModel>, { payload }: AddMunicipio) {
    return this.municipioService.addMunicipio(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          municipios: [...state.municipios, response.data],
        });
      })
    );
  }

  // Acción para actualizar municipio
  @Action(UpdateMunicipio)
  updateMunicipio({ getState, setState }: StateContext<MunicipioStateModel>, { payload }: UpdateMunicipio) {
    return this.municipioService.updateMunicipio(payload).pipe(
      tap((response) => {
        const state = getState();
        const municipios = [...state.municipios];
        const index = municipios.findIndex((municipio) => municipio.idMunicipio === payload.idMunicipio);
        municipios[index] = response.data;
        setState({
          ...state,
          municipios,
        });
      })
    );
  }

  // Acción para eliminar municipio
  @Action(DeleteMunicipio)
  deleteMunicipio({ getState, setState }: StateContext<MunicipioStateModel>, { id }: DeleteMunicipio) {
    return this.municipioService.deleteMunicipio(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.municipios.filter((municipios) => municipios.idMunicipio !== id);
        setState({
          ...state,
          municipios: filteredArray,
        });
      })
    );
  }
}
