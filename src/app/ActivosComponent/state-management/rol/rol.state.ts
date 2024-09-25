import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddRol, DeleteRol, GetRols, UpdateRol } from './rol.actions';
import { RolModel } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';

export interface RolStateModel {
  rols: RolModel[];
}

@State<RolStateModel>({
  name: 'rols',
  defaults: {
    rols: [],
  }
})
@Injectable()
export class RolState {
  constructor(private rolService: RolService) {}

  // Selector para obtener roles del estado
  @Selector()
  static getRols(state: RolStateModel) {
    return state.rols;
  }

  // Acción para obtener los Roles
  @Action(GetRols)
  getRols({ patchState }: StateContext<RolStateModel>) {
    return this.rolService.getAllRols().pipe(
      tap((response) => {
        patchState({ rols: response.data });
      })
    );
  }
  
  // Acción para agregar usuario
  @Action(AddRol)
  addRol({ getState, patchState }: StateContext<RolStateModel>, { payload }: AddRol) {
    return this.rolService.addRol(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          rols: [...state.rols, response.data],
        });
      })
    );
  }

  // Acción para actualizar rol
  @Action(UpdateRol)
  updateRol({ getState, setState }: StateContext<RolStateModel>, { payload }: UpdateRol) {
    return this.rolService.updateRol(payload).pipe(
      tap((response) => {
        const state = getState();
        const rols = [...state.rols];
        const index = rols.findIndex((rol) => rol.idRol === payload.idRol);
        rols[index] = response.data;
        setState({
          ...state,
          rols,
        });
      })
    );
  }

  // Acción para eliminar rol
  @Action(DeleteRol)
  deleteRol({ getState, setState }: StateContext<RolStateModel>, { id }: DeleteRol) {
    return this.rolService.deleteRol(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.rols.filter((rols) => rols.idRol !== id);
        setState({
          ...state,
          rols: filteredArray,
        });
      })
    );
  }
}
