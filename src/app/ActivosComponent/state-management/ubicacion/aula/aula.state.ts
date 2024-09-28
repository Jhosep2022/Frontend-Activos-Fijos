import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddAula, DeleteAula, GetAula, UpdateAula } from './aula.actions';
import { AulaModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { AulaService } from 'src/app/ActivosComponent/services/ubicacion/aula.service';

export interface AulaStateModel {
  aulas: AulaModel[];
}

@State<AulaStateModel>({
  name: 'aulas',
  defaults: {
    aulas: [],
  }
})
@Injectable()
export class AulaState {
  constructor(private aulaService: AulaService) {}

  // Selector para obtener aulas del estado
  @Selector()
  static getAulas(state: AulaStateModel) {
    return state.aulas;
  }

  // Acción para obtener las Aulas
  @Action(GetAula)
  getAulas({ patchState }: StateContext<AulaStateModel>) {
    return this.aulaService.getAllAulas().pipe(
      tap((response) => {
        patchState({ aulas: response.data });
      })
    );
  }
  
  // Acción para agregar aula
  @Action(AddAula)
  addAula({ getState, patchState }: StateContext<AulaStateModel>, { payload }: AddAula) {
    return this.aulaService.addAula(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          aulas: [...state.aulas, response.data],
        });
      })
    );
  }

  // Acción para actualizar aula
  @Action(UpdateAula)
  updateAula({ getState, setState }: StateContext<AulaStateModel>, { payload }: UpdateAula) {
    return this.aulaService.updateAula(payload).pipe(
      tap((response) => {
        const state = getState();
        const aulas = [...state.aulas];
        const index = aulas.findIndex((aula) => aula.idAula === payload.idAula);
        aulas[index] = response.data;
        setState({
          ...state,
          aulas,
        });
      })
    );
  }

  // Acción para eliminar aula
  @Action(DeleteAula)
  deleteAula({ getState, setState }: StateContext<AulaStateModel>, { id }: DeleteAula) {
    return this.aulaService.deleteAula(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.aulas.filter((aula) => aula.idAula !== id);
        setState({
          ...state,
          aulas: filteredArray,
        });
      })
    );
  }
}
