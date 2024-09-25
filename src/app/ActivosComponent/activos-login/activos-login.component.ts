import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { LoginModel } from '../models/user.model';

@Component({
  selector: 'app-activos-login',
  templateUrl: './activos-login.component.html',
  styleUrls: ['./activos-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivosLoginComponent implements OnInit  {
  loginUser: LoginModel = {
    correo: '',
    password: ''
  };
  hide = true;
  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }
  iniciarSesion(){
    this.userService.login(this.loginUser).subscribe((response) => {
      console.log(response);
    });
  }
  guardarDatos(){
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
