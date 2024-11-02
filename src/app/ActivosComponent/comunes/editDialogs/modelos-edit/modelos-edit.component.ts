import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ModeloModel } from 'src/app/ActivosComponent/models/modelo.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetMarca } from 'src/app/ActivosComponent/state-management/marca/marca.action';
import { MarcaState } from 'src/app/ActivosComponent/state-management/marca/marca.state';
import { UpdateModelo } from 'src/app/ActivosComponent/state-management/modelo/modelo.action';

@Component({
  selector: 'app-modelos-edit',
  templateUrl: './modelos-edit.component.html',
  styleUrls: ['./modelos-edit.component.scss']
})
export class ModelosEditComponent implements OnInit {
  marcas$: Observable<any[]>; // Observable que contiene las marcas
  modelo: ModeloModel = {
    idModelo: 0,
    nombre: '',
    marcaId: 1,
    descripcion: '',
    estado: true
  };

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ModelosEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar
  ) {
    this.marcas$ = this.store.select(MarcaState.getMarcas);
    this.modelo = {
      ...data.modelo
    };
  }

  ngOnInit(): void {
    this.store.dispatch(new GetMarca());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarModelo() {
    this.store.dispatch(new UpdateModelo(this.modelo)).subscribe({
      next: () => {
        console.log('Modelo actualizado exitosamente');
        this.openSnackBar('Modelo actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar modelo:', error);
        this.openSnackBar('El modelo no se pudo actualizar', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}