import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { MarcaModel } from 'src/app/ActivosComponent/models/marca.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetMarca, UpdateMarca } from 'src/app/ActivosComponent/state-management/marca/marca.action';

@Component({
  selector: 'app-marcas-edit',
  templateUrl: './marcas-edit.component.html',
  styleUrls: ['./marcas-edit.component.scss']
})
export class MarcasEditComponent implements OnInit {
  marca: MarcaModel = {
    idMarca: 0,
    nombre: '',
    paisOrigen: '',
    descripcion: '',
    estado: true
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<MarcasEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.marca = { ...data.marca };
    }

  ngOnInit(): void {
    this.store.dispatch(new GetMarca());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarMarca() {
    this.store.dispatch(new UpdateMarca(this.marca)).subscribe({
      next: () => {
        this.openSnackBar('Marca actualizada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar marca:', error);
        this.openSnackBar('No se pudo actualizar la marca', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}