import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddBloque, DeleteBloque, GetBloque, UpdateBloque } from './bloque.actions';
import { BloqueModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { BloqueService } from 'src/app/ActivosComponent/services/ubicacion/bloque.service';

export interface BloqueStateModel {
  bloques: BloqueModel[];
}

@State<BloqueStateModel>({
  name: 'bloques',
  defaults: {
    bloques: [],
  }
})
@Injectable()
export class BloqueState {
  constructor(private bloqueService: BloqueService) {}

  // Selector para obtener bloques del estado
  @Selector()
  static getBloques(state: BloqueStateModel) {
    return state.bloques;
  }

  // Acción para obtener los Bloques
  @Action(GetBloque)
  getBloques({ patchState }: StateContext<BloqueStateModel>) {
    return this.bloqueService.getAllBloques().pipe(
      tap((response) => {
        patchState({ bloques: response.data });
      })
    );
  }
  
  // Acción para agregar bloque
  @Action(AddBloque)
  addBloque({ getState, patchState }: StateContext<BloqueStateModel>, { payload }: AddBloque) {
    return this.bloqueService.addBloque(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          bloques: [...state.bloques, response.data],
        });
      })
    );
  }

  // Acción para actualizar bloque
  @Action(UpdateBloque)
  updateBloque({ getState, setState }: StateContext<BloqueStateModel>, { payload }: UpdateBloque) {
    return this.bloqueService.updateBloque(payload).pipe(
      tap((response) => {
        const state = getState();
        const bloques = [...state.bloques];
        const index = bloques.findIndex((bloque) => bloque.idBloque === payload.idBloque);
        bloques[index] = response.data;
        setState({
          ...state,
          bloques,
        });
      })
    );
  }

  // Acción para eliminar bloque
  @Action(DeleteBloque)
  deleteBloque({ getState, setState }: StateContext<BloqueStateModel>, { id }: DeleteBloque) {
    return this.bloqueService.deleteBloque(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.bloques.filter((bloque) => bloque.idBloque !== id);
        setState({
          ...state,
          bloques: filteredArray,
        });
      })
    );
  }
}
