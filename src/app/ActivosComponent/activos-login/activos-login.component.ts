import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-activos-login',
  templateUrl: './activos-login.component.html',
  styleUrls: ['./activos-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivosLoginComponent implements OnInit  {
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

  iniciarsesion(){
    localStorage.setItem('sesion', 'true');
    localStorage.setItem('usuario', 'admin');
    localStorage.setItem('nombre', 'Administrador');
    localStorage.setItem('rol', 'Administrador');
  }

  //Login para editor reemplazable
  iniciarsesionEditor(){
    localStorage.setItem('sesion', 'true');
    localStorage.setItem('usuario', 'admin');
    localStorage.setItem('nombre', 'Administrador');
    localStorage.setItem('rol', 'Editor');
  }
  //Login para lector reemplazable
  iniciarsesionLector(){
    localStorage.setItem('sesion', 'true');
    localStorage.setItem('usuario', 'admin');
    localStorage.setItem('nombre', 'Administrador');
    localStorage.setItem('rol', 'Lector');
  }
}
