import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DivisaModel } from '../../models/divisa.model';
import { AddCurrency, DeleteCurrency, GetCurrency, UpdateCurrency } from './divisa.action';
import { DivisaService } from '../../services/divisa.service';

export interface CurrencyStateModel {
  currencies: DivisaModel[];
}

@State<CurrencyStateModel>({
  name: 'currencies',
  defaults: {
    currencies: [],
  }
})
@Injectable()
export class DivisaState {
  constructor(private divisaService: DivisaService) {}

  // Selector para obtener divisa del estado
  @Selector()
  static getDivisa(state: CurrencyStateModel) {
    return state.currencies;
  }

  // Acción para obtener los divisa
  @Action(GetCurrency)
  getDivisa({ patchState }: StateContext<CurrencyStateModel>) {
    return this.divisaService.getAllCurrency().pipe(
      tap((response) => {
        patchState({ currencies: response.data });
      })
    );
  }
  
  // Acción para agregar divisa
  @Action(AddCurrency)
  addCurrency({ getState, patchState }: StateContext<CurrencyStateModel>, { payload }: AddCurrency) {
    return this.divisaService.addCurrency(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
            currencies: [...state.currencies, response.data],
        });
      })
    );
  }

  // Acción para actualizar divisa
  @Action(UpdateCurrency)
  updateCurrency({ getState, setState }: StateContext<CurrencyStateModel>, { payload }: UpdateCurrency) {
    return this.divisaService.updateCurrency(payload).pipe(
      tap((response) => {
        const state = getState();
        const currencies = [...state.currencies];
        const index = currencies.findIndex((currency) => currency.idDivisa === payload.idDivisa);
        currencies[index] = response.data;
        setState({
          ...state,
          currencies,
        });
      })
    );
  }

  // Acción para eliminar divisa
  @Action(DeleteCurrency)
  deleteCurrency({ getState, setState }: StateContext<CurrencyStateModel>, { id }: DeleteCurrency) {
    return this.divisaService.deleteCurrency(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.currencies.filter((currencies) => currencies.idDivisa !== id);
        setState({
          ...state,
          currencies: filteredArray,
        });
      })
    );
  }
}
