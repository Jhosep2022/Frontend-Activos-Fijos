import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RolModel } from 'src/app/ActivosComponent/models/rol.model';
import { UserModel } from 'src/app/ActivosComponent/models/user.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetRols } from 'src/app/ActivosComponent/state-management/rol/rol.actions';
import { RolState } from 'src/app/ActivosComponent/state-management/rol/rol.state';
import { AddUser, UpdateUser } from 'src/app/ActivosComponent/state-management/user/user.actions';
import { DireccionDialogComponent } from '../../direccionDialogs/direccion-dialog/direccion-dialog.component';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioEditComponent implements OnInit {
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
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<DireccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.roles$ = this.store.select(RolState.getRols);
      this.user = {
        idUsuario: this.data.usuario.idUsuario,
        nombre: this.data.usuario.nombre,
        password: this.data.usuario.password,
        correo:this.data.usuario.correo,
        estado: this.data.usuario.estado,
        telefono: this.data.usuario.telefono,
        rolId: this.data.usuario.rolId,
        apellidoPaterno: this.data.usuario.apellidoPaterno,
        apellidoMaterno: this.data.usuario.apellidoMaterno
      };
    }

  ngOnInit(): void {
    this.store.dispatch(new GetRols());
  }

  hide = true;
  actualizarUsuario() {
    this.store.dispatch(new UpdateUser(this.user)).subscribe({
      next: () => {
        console.log('Activo Actualizado exitosamente');
        this.openSnackBar('Usuario Actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar activo:', error);
        this.openSnackBar('El Usuario no se pudo actualizar', 'Cerrar');
      }
    });
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
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}

