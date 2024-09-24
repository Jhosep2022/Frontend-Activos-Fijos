import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gestion-ubicaciones',
  templateUrl: './gestion-ubicaciones.component.html',
  styleUrls: ['./gestion-ubicaciones.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionUbicacionesComponent implements OnInit {

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
  
    constructor() { }
  
    ngOnInit(): void {}
  
  }
  