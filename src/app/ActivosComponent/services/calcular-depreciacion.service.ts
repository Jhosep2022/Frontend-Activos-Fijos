import { Injectable } from '@angular/core';
import { CategoriaModel } from '../models/categorias.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CategoriaState } from '../state-management/categoria/categoria.state';

@Injectable({
  providedIn: 'root'
})
export class CalcularDepreciacionService {
  
  categorias$: Observable<CategoriaModel[]>;
  listaCategorias: CategoriaModel[] = [];

  constructor(private store: Store) {
    this.categorias$ = this.store.select(CategoriaState.getCategorias);
  }

  calcularMesesEntreFechas(fechaInicial: Date, fechaActual: Date): number {
    const años = fechaActual.getFullYear() - fechaInicial.getFullYear();
    const meses = fechaActual.getMonth() - fechaInicial.getMonth();
    
    // Calcular la diferencia total en meses
    const diferenciaEnMeses = años * 12 + meses;
  
    return diferenciaEnMeses;
  }

  obtenerCategoria(categoriaId: number): CategoriaModel{
    this.categorias$.subscribe((categorias) => {
      this.listaCategorias = categorias;
    });
    const categoria = this.listaCategorias.find(categoria => categoria.idCategoria === categoriaId);
    return categoria || {idCategoria: 0, nombre: '', tiempoDeVida: 1, coeficienteAnual: 1};
  }

  obtenerValorActual(fechaInicial: Date, valorInicial: number, categoriaId: number, fechaDepreciar: Date): number {
    const fecchaInicial = new Date(fechaInicial);
    const fechaActual = new Date(fechaDepreciar);
    const categoriaEscogida = this.obtenerCategoria(categoriaId);
    const cantidadMeses = this.calcularMesesEntreFechas(fecchaInicial, fechaActual);
    let valorActual = valorInicial;

    if(cantidadMeses >= (categoriaEscogida.tiempoDeVida * 12)){
      valorActual = 1;
    }else {
      if(cantidadMeses > 1){
        const montoDepreciado = cantidadMeses * (categoriaEscogida.coeficienteAnual / 12);
        valorActual = valorInicial - (valorInicial*(montoDepreciado/100));
      }
    }

    return valorActual;
  }
}
