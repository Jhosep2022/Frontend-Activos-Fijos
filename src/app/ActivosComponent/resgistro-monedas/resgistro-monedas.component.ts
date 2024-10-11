import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DivisaModel } from '../models/divisa.model';
import { Store } from '@ngxs/store';
import { AddCurrency } from '../state-management/divisa/divisa.action';

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
    this.store.dispatch(new AddCurrency(this.divisa));
    this.divisa = {
      idDivisa: 0,
      valor: 0,
      nombre: '',
      abreviacion: ''
    };
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
  
    constructor(private store: Store) { }
  
    ngOnInit(): void {}
  
  }
  
