import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { DivisaModel } from 'src/app/ActivosComponent/models/divisa.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { UpdateCurrency } from 'src/app/ActivosComponent/state-management/divisa/divisa.action';
import { DireccionDialogComponent } from '../../direccionDialogs/direccion-dialog/direccion-dialog.component';

@Component({
  selector: 'app-divisa-edit',
  templateUrl: './divisa-edit.component.html',
  styleUrls: ['./divisa-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DivisaEditComponent implements OnInit {
  divisa: DivisaModel = {
    idDivisa: 0,
    valor: 0,
    nombre: '',
    abreviacion: ''
  };
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<DireccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.divisa = {
        idDivisa: this.data.divisa.idDivisa,
        valor: this.data.divisa.valor,
        nombre: this.data.divisa.nombre,
        abreviacion: this.data.divisa.abreviacion
      };
    }

  ngOnInit(): void {
  }

  hide = true;

  actualizarMoneda() {
    this.store.dispatch(new UpdateCurrency(this.divisa)).subscribe({
      next: () => {
        console.log('Moneda actualizada exitosamente');
        this.openSnackBar('Moneda actualizada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar moneda:', error);
        this.openSnackBar('La Moneda no se pudo actualizar', 'Cerrar');
      }
    });
    this.divisa = {
      idDivisa: 0,
      valor: 0,
      nombre: '',
      abreviacion: ''
    };
    this.cerrarDialog()
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}

