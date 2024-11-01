import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { SucursalModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddSucursal } from 'src/app/ActivosComponent/state-management/ubicacion/sucursal/sucursal.actions';

@Component({
  selector: 'app-sucursal-dialog',
  templateUrl: './sucursal-dialog.component.html',
  styleUrls: ['./sucursal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SucursalDialogComponent implements OnInit {

  sucursal: SucursalModel = {
    idSucursal: 0,
    nombre: '',
    municipioId: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<SucursalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  agregarSucursal() {
    this.sucursal.municipioId = this.data.sucursal.municipioId;
    this.store.dispatch(new AddSucursal(this.sucursal)).subscribe({
      next: () => {
        console.log('Sucursal agregada exitosamente');
        this.openSnackBar('Sucursal agregada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregar Sucursal:', error);
        this.openSnackBar('El Sucursal no se pudo agregar', 'Cerrar');
      }
    });
    this.sucursal = {
      idSucursal: 0,
      nombre: '',
      municipioId: 0
    };
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
