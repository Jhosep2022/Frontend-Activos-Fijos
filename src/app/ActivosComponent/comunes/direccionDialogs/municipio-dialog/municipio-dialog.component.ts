import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { MunicipioModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddMunicipio } from 'src/app/ActivosComponent/state-management/ubicacion/municipio/municipio.actions';

@Component({
  selector: 'app-municipio-dialog',
  templateUrl: './municipio-dialog.component.html',
  styleUrls: ['./municipio-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MunicipioDialogComponent implements OnInit {

  municipio: MunicipioModel = {
    idMunicipio: 0,
    nombre: '',
    provinciaId: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<MunicipioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {}

  agregarMunicipio() {
    console.log("munici", this.municipio);
    this.municipio.provinciaId = this.data.municipio.provinciaId;
    this.store.dispatch(new AddMunicipio(this.municipio)).subscribe({
      next: () => {
        console.log('Municipio agregado exitosamente');
        this.openSnackBar('Municipio agregado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregar Municipio:', error);
        this.openSnackBar('El Municipio no se pudo agregar', 'Cerrar');
      }
    });
    this.municipio = {
      idMunicipio: 0,
      nombre: '',
      provinciaId: 0
    };
    this.cerrarDialog();
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
