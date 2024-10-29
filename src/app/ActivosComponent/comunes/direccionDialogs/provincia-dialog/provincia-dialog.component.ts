import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { ProvinciaModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddProvincia } from 'src/app/ActivosComponent/state-management/ubicacion/provincia/provincia.actions';

@Component({
  selector: 'app-provincia-dialog',
  templateUrl: './provincia-dialog.component.html',
  styleUrls: ['./provincia-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProvinciaDialogComponent implements OnInit {

  provincia: ProvinciaModel = {
    idProvincia: 0,
    nombre: '',
    idDepartamento: 0
  };
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }


  agregarProvincia() {
    this.provincia.idDepartamento = this.data.provincia.idDepartamento;
    this.store.dispatch(new AddProvincia(this.provincia)).subscribe({
      next: () => {
        console.log('Provincia agregada exitosamente');
        this.openSnackBar('Provincia agregada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregar Provincia:', error);
        this.openSnackBar('El Provincia no se pudo agregar', 'Cerrar');
      }
    });
    this.provincia = {
      idProvincia: 0,
      nombre: '',
      idDepartamento: 0
    };
    this.cerrarDialog();
  }

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProvinciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
