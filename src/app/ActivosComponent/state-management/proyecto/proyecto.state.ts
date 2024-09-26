import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProyectoModel } from '../../models/proyecto.model';
import { AddProyecto, DeleteProyecto, GetProyecto, UpdateProyecto } from './proyecto.action';
import { ProyectoService } from '../../services/proyecto.service';

export interface ProyectoStateModel {
  proyectos: ProyectoModel[];
}

@State<ProyectoStateModel>({
  name: 'proyectos',
  defaults: {
    proyectos: [],
  }
})
@Injectable()
export class ProyectoState {
  constructor(private proyectoService: ProyectoService) {}

  // Selector para obtener proyectos del estado
  @Selector()
  static getProyectos(state: ProyectoStateModel) {
    return state.proyectos;
  }

  // Acción para obtener los proyectos
  @Action(GetProyecto)
  getProyectos({ patchState }: StateContext<ProyectoStateModel>) {
    return this.proyectoService.getAllProyectos().pipe(
      tap((response) => {
        patchState({ proyectos: response.data });
      })
    );
  }

  // Acción para agregar un proyecto
  @Action(AddProyecto)
  addProyecto({ getState, patchState }: StateContext<ProyectoStateModel>, { payload }: AddProyecto) {
    return this.proyectoService.addProyecto(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
            proyectos: [...state.proyectos, response.data],
        });
      })
    );
  }

  // Acción para actualizar un proyecto
  @Action(UpdateProyecto)
  updateProyecto({ getState, setState }: StateContext<ProyectoStateModel>, { payload }: UpdateProyecto) {
    return this.proyectoService.updateProyecto(payload).pipe(
      tap((response) => {
        const state = getState();
        const proyectos = [...state.proyectos];
        const index = proyectos.findIndex((proyecto) => proyecto.idProyecto === payload.idProyecto);
        proyectos[index] = response.data;
        setState({
          ...state,
          proyectos,
        });
      })
    );
  }

  // Acción para eliminar un proyecto
  @Action(DeleteProyecto)
  deleteProyecto({ getState, setState }: StateContext<ProyectoStateModel>, { id }: DeleteProyecto) {
    return this.proyectoService.deleteProyecto(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.proyectos.filter((proyecto) => proyecto.idProyecto !== id);
        setState({
          ...state,
          proyectos: filteredArray,
        });
      })
    );
  }
}
