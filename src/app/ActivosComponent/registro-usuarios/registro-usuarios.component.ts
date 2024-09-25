import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUser } from '../state-management/user/user.actions';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroUsuariosComponent implements OnInit {

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

  agregarUsuario(usuario: any) {
    this.store.dispatch(new AddUser(usuario));
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store) { }
  
    ngOnInit(): void {}
  
  }
  