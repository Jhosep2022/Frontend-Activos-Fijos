import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-resgistro-monedas',
  templateUrl: './resgistro-monedas.component.html',
  styleUrls: ['./resgistro-monedas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResgistroMonedasComponent implements OnInit {

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
  
