import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddRol, GetRols } from './rol.actions';
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
}
