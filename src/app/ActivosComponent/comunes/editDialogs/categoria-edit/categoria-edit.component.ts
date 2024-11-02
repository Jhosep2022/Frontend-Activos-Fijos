import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { CategoriaModel } from 'src/app/ActivosComponent/models/categorias.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetCategoria, UpdateCategoria } from 'src/app/ActivosComponent/state-management/categoria/categoria.action';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.scss']
})
export class CategoriaEditComponent implements OnInit {
  categoria: CategoriaModel = {
    idCategoria: 0,
    nombre: '',
    tiempoDeVida: 0,
    coeficienteAnual: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<CategoriaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.categoria = {
        idCategoria: data.categoria.idCategoria,
        nombre: data.categoria.nombre,
        tiempoDeVida: data.categoria.tiempoDeVida,
        coeficienteAnual: data.categoria.coeficienteAnual
      };
    }

  ngOnInit(): void {
    this.store.dispatch(new GetCategoria());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarCategoria() {
    this.store.dispatch(new UpdateCategoria(this.categoria)).subscribe({
      next: () => {
        this.openSnackBar('Categoría actualizada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar categoría:', error);
        this.openSnackBar('No se pudo actualizar la categoría', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}