import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HistorialActivosModel } from '../../models/historial-activos.model';
import { HistorialActivoService } from '../../services/historial-activo.service';
import { GetHistorialActivo, AddHistorialActivo, UpdateHistorialActivo, DeleteHistorialActivo, GetHistorialActivoByActivoId } from './historial-activo.action';

export interface HistorialActivoStateModel {
  historialesActivos: HistorialActivosModel[];
}

@State<HistorialActivoStateModel>({
  name: 'historialesActivos',
  defaults: {
    historialesActivos: [],
  }
})
@Injectable()
export class HistorialActivoState {
  constructor(private historialService: HistorialActivoService) {}

  @Selector()
  static getHistorialesActivos(state: HistorialActivoStateModel) {
    return state.historialesActivos;
  }

  @Action(GetHistorialActivo)
  getHistorialesActivos({ patchState }: StateContext<HistorialActivoStateModel>) {
    return this.historialService.getAllHistoriales().pipe(
      tap((response) => {
        patchState({ historialesActivos: response.data });
      })
    );
  }

  @Action(GetHistorialActivoByActivoId)
  getProductosByCategoriaId(
    { patchState }: StateContext<HistorialActivoStateModel>,
    { activoId }: GetHistorialActivoByActivoId
  ) {
    return this.historialService.getHistorialActivoById(activoId).pipe(
      tap((response) => {
        patchState({ historialesActivos: response.data });
      })
    );
  }

  @Action(AddHistorialActivo)
  addHistorialActivo({ getState, patchState }: StateContext<HistorialActivoStateModel>, { payload }: AddHistorialActivo) {
    return this.historialService.addHistorial(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          historialesActivos: [...state.historialesActivos, response.data],
        });
      })
    );
  }

  @Action(UpdateHistorialActivo)
  updateHistorialActivo({ getState, patchState }: StateContext<HistorialActivoStateModel>, { payload }: UpdateHistorialActivo) {
    return this.historialService.updateHistorial(payload).pipe(
      tap((response) => {
        const state = getState();
        const historialesActivos = state.historialesActivos.map((historial) =>
          historial.idHistorial === payload.id ? response.data : historial
        );
        patchState({ historialesActivos });
      })
    );
  }

  @Action(DeleteHistorialActivo)
  deleteHistorialActivo({ getState, patchState }: StateContext<HistorialActivoStateModel>, { id }: DeleteHistorialActivo) {
    return this.historialService.deleteHistorial(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.historialesActivos.filter(historial => historial.idHistorial !== id);
        patchState({ historialesActivos: filteredArray });
      })
    );
  }
}
