import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserModel } from 'src/app/ActivosComponent/models/user.model';
import { UserServiceService } from 'src/app/ActivosComponent/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

menuSidebarActive:boolean = false;
isProfileEnabled:boolean = false;
hide = true;

user: UserModel | undefined;

constructor(private userservice: UserServiceService) {}

myfunction(){
  if(this.menuSidebarActive == false){
    this.menuSidebarActive = true;
  }
  else {
    this.menuSidebarActive = false;
  }
}

editProfileEnable(){
  if(this.isProfileEnabled == false){
    this.isProfileEnabled = true;
  }
  else {
    this.isProfileEnabled = false;
  }
}

ngOnInit(): void {
  this.userservice.getUserProfile().subscribe(
    (response) => {
      this.user = response.data;  // Almacena los datos del usuario en la variable 'user'
    },
    (error) => {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  );
}

}
