import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SucursalModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { SucursalService } from 'src/app/ActivosComponent/services/ubicacion/sucursal.service';
import { AddSucursal, DeleteSucursal, GetSucursal, UpdateSucursal } from './sucursal.actions';

export interface SucursalStateModel {
  sucursales: SucursalModel[];
}

@State<SucursalStateModel>({
  name: 'sucursales',
  defaults: {
    sucursales: [],
  }
})
@Injectable()
export class SucursalState {
  constructor(private sucursalService: SucursalService) {}

  // Selector para obtener sucursales del estado
  @Selector()
  static getSucursales(state: SucursalStateModel) {
    return state.sucursales;
  }

  // Acción para obtener las Sucursales
  @Action(GetSucursal)
  getSucursales({ patchState }: StateContext<SucursalStateModel>) {
    return this.sucursalService.getAllSucursales().pipe(
      tap((response) => {
        patchState({ sucursales: response.data });
      })
    );
  }
  
  // Acción para agregar sucursal
  @Action(AddSucursal)
  addSucursal({ getState, patchState }: StateContext<SucursalStateModel>, { payload }: AddSucursal) {
    return this.sucursalService.addSucursal(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          sucursales: [...state.sucursales, response.data],
        });
      })
    );
  }

  // Acción para actualizar sucursal
  @Action(UpdateSucursal)
  updateSucursal({ getState, setState }: StateContext<SucursalStateModel>, { payload }: UpdateSucursal) {
    return this.sucursalService.updateSucursal(payload).pipe(
      tap((response) => {
        const state = getState();
        const sucursales = [...state.sucursales];
        const index = sucursales.findIndex((sucursal) => sucursal.idSucursal === payload.idSucursal);
        sucursales[index] = response.data;
        setState({
          ...state,
          sucursales,
        });
      })
    );
  }

  // Acción para eliminar sucursal
  @Action(DeleteSucursal)
  deleteSucursal({ getState, setState }: StateContext<SucursalStateModel>, { id }: DeleteSucursal) {
    return this.sucursalService.deleteSucursal(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.sucursales.filter((sucursal) => sucursal.idSucursal !== id);
        setState({
          ...state,
          sucursales: filteredArray,
        });
      })
    );
  }
}
