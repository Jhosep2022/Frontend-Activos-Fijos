import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AreaModel } from '../../models/area.model';
import { AreaService } from '../../services/area.service';
import { AddArea, DeleteArea, GetArea, UpdateArea } from './area.action';

export interface AreasStateModel {
  areas: AreaModel[];
}

@State<AreasStateModel>({
  name: 'areas',
  defaults: {
    areas: [],
  }
})
@Injectable()
export class AreasState {
  constructor(private areaService: AreaService) {}

  // Selector para obtener áreas del estado
  @Selector()
  static getAreas(state: AreasStateModel) {
    return state.areas;
  }

  // Acción para obtener las áreas
  @Action(GetArea)
  getAreas({ patchState }: StateContext<AreasStateModel>) {
    return this.areaService.getAllAreas().pipe(
      tap((response) => {
        patchState({ areas: response.data });
      })
    );
  }

  // Acción para agregar un área
  @Action(AddArea)
  addArea({ getState, patchState }: StateContext<AreasStateModel>, { payload }: AddArea) {
    return this.areaService.addArea(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          areas: [...state.areas, response.data],
        });
      })
    );
  }

  // Acción para actualizar un área
  @Action(UpdateArea)
  updateArea({ getState, setState }: StateContext<AreasStateModel>, { payload }: UpdateArea) {
    return this.areaService.updateArea(payload).pipe(
      tap((response) => {
        const state = getState();
        const areas = [...state.areas];
        const index = areas.findIndex((area) => area.idArea === payload.id);
        areas[index] = response.data;
        setState({
          ...state,
          areas,
        });
      })
    );
  }

  // Acción para eliminar un área
  @Action(DeleteArea)
  deleteArea({ getState, setState }: StateContext<AreasStateModel>, { id }: DeleteArea) {
    return this.areaService.deleteArea(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.areas.filter((area) => area.idArea !== id);
        setState({
          ...state,
          areas: filteredArray,
        });
      })
    );
  }
}
