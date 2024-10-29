import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DivisaModel } from '../models/divisa.model';
import { Store } from '@ngxs/store';
import { AddCurrency } from '../state-management/divisa/divisa.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resgistro-monedas',
  templateUrl: './resgistro-monedas.component.html',
  styleUrls: ['./resgistro-monedas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResgistroMonedasComponent implements OnInit {
  divisa: DivisaModel = {
    idDivisa: 0,
    valor: 0,
    nombre: '',
    abreviacion: ''
  };

  agregarMoneda() {
    this.store.dispatch(new AddCurrency(this.divisa)).subscribe({
      next: () => {
        console.log('Moneda registrada exitosamente');
        this.openSnackBar('Moneda registrada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al registrar moneda:', error);
        this.openSnackBar('La Moneda no se pudo registrar', 'Cerrar');
      }
    });
    this.divisa = {
      idDivisa: 0,
      valor: 0,
      nombre: '',
      abreviacion: ''
    };
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  //sidebar menu activation start
  menuSidebarActive:boolean=false;
  myfunction(){
    if(this.menuSidebarActive==false){
      this.menuSidebarActive=true;
    }
    else {
      this.menuSidebarActive=false;
    }
  }
  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store, private _snackBar: MatSnackBar) { }
  
    ngOnInit(): void {}
  
  }
  
