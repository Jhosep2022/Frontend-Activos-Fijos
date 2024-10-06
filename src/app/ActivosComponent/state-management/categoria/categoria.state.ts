import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CategoriaService } from '../../services/categoria.service';
import { AddCategoria, DeleteCategoria, GetCategoria, UpdateCategoria } from './categoria.action';
import { CategoriaModel } from '../../models/categorias.model';

export interface CategoriaStateModel {
  categorias: CategoriaModel[];
}

@State<CategoriaStateModel>({
  name: 'categorias',
  defaults: {
    categorias: [],
  }
})
@Injectable()
export class CategoriaState {
  constructor(private categoriaService: CategoriaService) {}

  @Selector()
  static getCategorias(state: CategoriaStateModel) {
    return state.categorias;
  }

  @Action(GetCategoria)
  getCategorias({ patchState }: StateContext<CategoriaStateModel>) {
    return this.categoriaService.getAllCategorias().pipe(
      tap((response) => {
        patchState({ categorias: response.data });
      })
    );
  }

  @Action(AddCategoria)
  addCategoria({ getState, patchState }: StateContext<CategoriaStateModel>, { payload }: AddCategoria) {
    return this.categoriaService.addCategoria(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          categorias: [...state.categorias, response.data],
        });
      })
    );
  }

  @Action(UpdateCategoria)
  updateCategoria({ getState, setState }: StateContext<CategoriaStateModel>, { payload }: UpdateCategoria) {
    return this.categoriaService.updateCategoria(payload).pipe(
      tap((response) => {
        const state = getState();
        const categorias = [...state.categorias];
        const index = categorias.findIndex((categoria) => categoria.idCategoria === payload.id);
        categorias[index] = response.data;
        setState({
          ...state,
          categorias,
        });
      })
    );
  }

  @Action(DeleteCategoria)
  deleteCategoria({ getState, setState }: StateContext<CategoriaStateModel>, { id }: DeleteCategoria) {
    return this.categoriaService.deleteCategoria(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.categorias.filter((categoria) => categoria.idCategoria !== id);
        setState({
          ...state,
          categorias: filteredArray,
        });
      })
    );
  }
}
