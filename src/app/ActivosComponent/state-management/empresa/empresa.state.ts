import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EmpresaModel } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { AddEmpresa, DeleteEmpresa, GetEmpresa, UpdateEmpresa } from './empresa-action';

export interface EmpresasStateModel {
  empresas: EmpresaModel[];
}

@State<EmpresasStateModel>({
  name: 'empresas',
  defaults: {
    empresas: [],
  }
})
@Injectable()
export class EmpresasState {
  constructor(private empresaService: EmpresaService) {}

  // Selector para obtener empresas del estado
  @Selector()
  static getEmpresas(state: EmpresasStateModel) {
    return state.empresas;
  }

  // Acción para obtener las empresas
  @Action(GetEmpresa)
  getEmpresas({ patchState }: StateContext<EmpresasStateModel>) {
    return this.empresaService.getAllEmpresas().pipe(
      tap((response) => {
        patchState({ empresas: response.data });
      })
    );
  }

  // Acción para agregar una empresa
  @Action(AddEmpresa)
  addEmpresa({ getState, patchState }: StateContext<EmpresasStateModel>, { payload }: AddEmpresa) {
    return this.empresaService.addEmpresa(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          empresas: [...state.empresas, response.data],
        });
      })
    );
  }

  // Acción para actualizar una empresa
  @Action(UpdateEmpresa)
  updateEmpresa({ getState, setState }: StateContext<EmpresasStateModel>, { payload }: UpdateEmpresa) {
    return this.empresaService.updateEmpresa(payload).pipe(
      tap((response) => {
        const state = getState();
        const empresas = [...state.empresas];
        const index = empresas.findIndex((empresa) => empresa.idEmpresa === payload.idEmpresa);
        empresas[index] = response.data;
        setState({
          ...state,
          empresas,
        });
      })
    );
  }

  // Acción para eliminar una empresa
  @Action(DeleteEmpresa)
  deleteEmpresa({ getState, setState }: StateContext<EmpresasStateModel>, { id }: DeleteEmpresa) {
    return this.empresaService.deleteEmpresa(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.empresas.filter((empresa) => empresa.idEmpresa !== id);
        setState({
          ...state,
          empresas: filteredArray,
        });
      })
    );
  }
}
