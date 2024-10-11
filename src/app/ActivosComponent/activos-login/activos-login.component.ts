import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { LoginModel } from '../models/user.model';
import { JwtdecoderService } from '../services/jwtdecoder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activos-login',
  templateUrl: './activos-login.component.html',
  styleUrls: ['./activos-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivosLoginComponent implements OnInit  {
  // Variables
  tokendecoded: any;
  loginUser: LoginModel = {
    correo: '',
    password: ''
  };
  hide = true;
  // Constructor
  constructor(private router: Router, private userService: UserServiceService, private jwdecoder: JwtdecoderService) { }

  ngOnInit(): void {
  }
  iniciarSesion(){
    //Decodifica el token y guarda los datos en el local storage    
    this.userService.login(this.loginUser).subscribe({
      next: (response) => {
        this.tokendecoded = this.jwdecoder.decodeToken(response.data);
        this.guardarDatos(response.data, this.tokendecoded.userId, this.tokendecoded.roleId, this.tokendecoded.sub);
        if(this.tokendecoded.roleId == 1){
          this.router.navigate(['/usuarios/lista']);
        }
        if(this.tokendecoded.roleId == 2){
          this.router.navigate(['/activos/lista']);
        }
        if(this.tokendecoded.roleId == 3){
          this.router.navigate(['/activos/lista']);
        }
      },
      error: (error) => {
        console.error('Error Login:', error);
        alert('Hubo un error al hacer login.');
      }
    });
  }
  guardarDatos(token: string, userid: number, rolid: number, correo: string){
    // Guarda los datos en el local storage, los Id se convierten a string, debes convertirlos a number al recuperarlos
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userid.toString());
    localStorage.setItem('roleId', rolid.toString());
    localStorage.setItem('correo', correo);
  }
}
