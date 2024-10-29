import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { DireccionModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddDireccion } from 'src/app/ActivosComponent/state-management/ubicacion/direccion/direccion.actions';

@Component({
  selector: 'app-direccion-dialog',
  templateUrl: './direccion-dialog.component.html',
  styleUrls: ['./direccion-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DireccionDialogComponent implements OnInit {

  direccion: DireccionModel = {
    idDireccion: 0,
    calle: '',
    detalle: '',
    zona: ''
  };
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<DireccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  agregarDireccion() {
    this.store.dispatch(new AddDireccion(this.direccion)).subscribe({
      next: () => {
        console.log('Direccion agregada exitosamente');
        this.openSnackBar('Direccion agregada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregar Direccion:', error);
        this.openSnackBar('El Direccion no se pudo agregar', 'Cerrar');
      }
    });
    this.direccion = {
      idDireccion: 0,
      calle: '',
      detalle: '',
      zona: ''
    };
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
