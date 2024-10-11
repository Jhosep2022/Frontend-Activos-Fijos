import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUser } from '../state-management/user/user.actions';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { RolState } from '../state-management/rol/rol.state';
import { RolModel } from '../models/rol.model';
import { GetRols } from '../state-management/rol/rol.actions';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroUsuariosComponent implements OnInit {
  roles$: Observable<RolModel[]>; // Observable que contiene los roles
  user: UserModel = {
    idUsuario: 0,
    nombre: '',
    password: '',
    correo: '',
    estado: true,
    telefono: '',
    rolId: 0,
    apellidoPaterno: '',
    apellidoMaterno: ''
  };

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

  agregarUsuario() {
    console.log(this.user);
    this.store.dispatch(new AddUser(this.user));
    this.user = {
      idUsuario: 0,
      nombre: '',
      password: '',
      correo: '',
      estado: true,
      telefono: '',
      rolId: 0,
      apellidoPaterno: '',
      apellidoMaterno: ''
    };
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store) {
      this.roles$ = this.store.select(RolState.getRols);
    }
  
    ngOnInit(): void {
      this.store.dispatch(new GetRols());
    }
  
  }
  