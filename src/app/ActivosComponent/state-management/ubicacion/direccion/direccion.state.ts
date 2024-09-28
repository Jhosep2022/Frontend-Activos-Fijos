import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddDireccion, DeleteDireccion, GetDireccion, UpdateDireccion } from './direccion.actions';
import { DireccionModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DireccionService } from 'src/app/ActivosComponent/services/ubicacion/direccion.service';

export interface DireccionStateModel {
  direcciones: DireccionModel[];
}

@State<DireccionStateModel>({
  name: 'direcciones',
  defaults: {
    direcciones: [],
  }
})
@Injectable()
export class DireccionState {
  constructor(private direccionService: DireccionService) {}

  // Selector para obtener direcciones del estado
  @Selector()
  static getDirecciones(state: DireccionStateModel) {
    return state.direcciones;
  }

  // Acción para obtener las Direcciones
  @Action(GetDireccion)
  getDirecciones({ patchState }: StateContext<DireccionStateModel>) {
    return this.direccionService.getAllDirecciones().pipe(
      tap((response) => {
        patchState({ direcciones: response.data });
      })
    );
  }
  
  // Acción para agregar dirección
  @Action(AddDireccion)
  addDireccion({ getState, patchState }: StateContext<DireccionStateModel>, { payload }: AddDireccion) {
    return this.direccionService.addDireccion(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          direcciones: [...state.direcciones, response.data],
        });
      })
    );
  }

  // Acción para actualizar dirección
  @Action(UpdateDireccion)
  updateDireccion({ getState, setState }: StateContext<DireccionStateModel>, { payload }: UpdateDireccion) {
    return this.direccionService.updateDireccion(payload).pipe(
      tap((response) => {
        const state = getState();
        const direcciones = [...state.direcciones];
        const index = direcciones.findIndex((direccion) => direccion.idDireccion === payload.idDireccion);
        direcciones[index] = response.data;
        setState({
          ...state,
          direcciones,
        });
      })
    );
  }

  // Acción para eliminar dirección
  @Action(DeleteDireccion)
  deleteDireccion({ getState, setState }: StateContext<DireccionStateModel>, { id }: DeleteDireccion) {
    return this.direccionService.deleteDireccion(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.direcciones.filter((direcciones) => direcciones.idDireccion !== id);
        setState({
          ...state,
          direcciones: filteredArray,
        });
      })
    );
  }
}
