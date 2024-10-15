import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  //short menu activation start
  menuShortcutActive:boolean=false;
  shortmenu(){
    if(this.menuShortcutActive==false){
      this.menuShortcutActive=true;
      this.emailShortcutActive=false;
      this.notifyShortcutActive=false;
      this.langShortcutActive=false;
      this.proShortcutActive=false;
    }
    else {
      this.menuShortcutActive=false;
    }
  }
  //short menu activation end

  //short menu activation start
  notifyShortcutActive:boolean=false;
  notifydropdown(){
    if(this.notifyShortcutActive==false){
      this.menuShortcutActive=false;
      this.emailShortcutActive=false;
      this.notifyShortcutActive=true;
      this.langShortcutActive=false;
      this.proShortcutActive=false;
    }
    else {
      this.notifyShortcutActive=false;
    }
  }
  //short menu activation end

  //short menu activation start
  emailShortcutActive:boolean=false;
  emaildropdown(){
    if(this.emailShortcutActive==false){
      this.menuShortcutActive=false;
      this.emailShortcutActive=true;
      this.notifyShortcutActive=false;
      this.langShortcutActive=false;
      this.proShortcutActive=false;
    }
    else {
      this.emailShortcutActive=false;

    }
  }
  //short menu activation end

  //short menu activation start
  langShortcutActive:boolean=false;
  langdropdown(){
    if(this.langShortcutActive==false){
      this.menuShortcutActive=false;
      this.emailShortcutActive=false;
      this.notifyShortcutActive=false;
      this.langShortcutActive=true;
      this.proShortcutActive=false;
    }
    else {
      this.langShortcutActive=false;

    }
  }
  //short menu activation end

  //short menu activation start
  proShortcutActive:boolean=false;
  prodropdown(){
    if(this.proShortcutActive==false){
      this.menuShortcutActive=false;
      this.emailShortcutActive=false;
      this.notifyShortcutActive=false;
      this.langShortcutActive=false;
      this.proShortcutActive=true;
    }
    else {
      this.proShortcutActive=false;

    }
  }
  //short menu activation end

  user: UserModel | null = null;

  constructor(
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.user = response.data;
      },
      error: (err) => {
        console.error('Error al obtener los datos del usuario', err);
      }
    });
  }

}
