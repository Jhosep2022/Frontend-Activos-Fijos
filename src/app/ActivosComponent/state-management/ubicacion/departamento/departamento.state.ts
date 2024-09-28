import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddDepartamento, DeleteDepartamento, GetDepartamento, UpdateDepartamento } from './departamento.actions';
import { DepartamentoModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DepartamentoService } from 'src/app/ActivosComponent/services/ubicacion/departamento.service';

export interface DepartamentoStateModel {
  departamentos: DepartamentoModel[];
}

@State<DepartamentoStateModel>({
  name: 'departamentos',
  defaults: {
    departamentos: [],
  }
})
@Injectable()
export class DepartamentoState {
  constructor(private departamentoService: DepartamentoService) {}

  // Selector para obtener departamentos del estado
  @Selector()
  static getDepartamentos(state: DepartamentoStateModel) {
    return state.departamentos;
  }

  // Acción para obtener los Departamentos
  @Action(GetDepartamento)
  getDepartamentos({ patchState }: StateContext<DepartamentoStateModel>) {
    return this.departamentoService.getAllDepartamentos().pipe(
      tap((response) => {
        patchState({ departamentos: response.data });
      })
    );
  }
  
  // Acción para agregar departamento
  @Action(AddDepartamento)
  addDepartamento({ getState, patchState }: StateContext<DepartamentoStateModel>, { payload }: AddDepartamento) {
    return this.departamentoService.addDepartamento(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          departamentos: [...state.departamentos, response.data],
        });
      })
    );
  }

  // Acción para actualizar departamento
  @Action(UpdateDepartamento)
  updateDepartamento({ getState, setState }: StateContext<DepartamentoStateModel>, { payload }: UpdateDepartamento) {
    return this.departamentoService.updateDepartamento(payload).pipe(
      tap((response) => {
        const state = getState();
        const departamentos = [...state.departamentos];
        const index = departamentos.findIndex((departamento) => departamento.idDepartamento === payload.idDepartamento);
        departamentos[index] = response.data;
        setState({
          ...state,
          departamentos,
        });
      })
    );
  }

  // Acción para eliminar departamento
  @Action(DeleteDepartamento)
  deleteDepartamento({ getState, setState }: StateContext<DepartamentoStateModel>, { id }: DeleteDepartamento) {
    return this.departamentoService.deleteDepartamento(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.departamentos.filter((departamentos) => departamentos.idDepartamento !== id);
        setState({
          ...state,
          departamentos: filteredArray,
        });
      })
    );
  }
}
