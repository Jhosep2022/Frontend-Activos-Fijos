import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { AulaModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddAula } from 'src/app/ActivosComponent/state-management/ubicacion/aula/aula.actions';

@Component({
  selector: 'app-aula-dialog',
  templateUrl: './aula-dialog.component.html',
  styleUrls: ['./aula-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AulaDialogComponent implements OnInit {

  aula: AulaModel = {
    idAula: 0,
    nombre: '',
    idBloque: 0,
    codigoUbicacion: ''
  };

  agregarAula() {
    this.aula.idBloque = this.data.aula.idBloque;
    this.store.dispatch(new AddAula(this.aula)).subscribe({
      next: () => {
        console.log('Aula agregada exitosamente');
        this.openSnackBar('Aula agregada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregar Aula:', error);
        this.openSnackBar('El Aula no se pudo agregar', 'Cerrar');
      }
    });
    this.aula = {
      idAula: 0,
      nombre: '',
      idBloque: 0,
      codigoUbicacion: ''
    };
    this.cerrarDialog();
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<AulaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}