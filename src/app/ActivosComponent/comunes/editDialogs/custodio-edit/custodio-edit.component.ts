import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { CustodiosModel } from 'src/app/ActivosComponent/models/custodios.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetCustodio, UpdateCustodio } from 'src/app/ActivosComponent/state-management/custodios/custodios.action';

@Component({
  selector: 'app-custodio-edit',
  templateUrl: './custodio-edit.component.html',
  styleUrls: ['./custodio-edit.component.scss']
})
export class CustodioEditComponent implements OnInit {
  custodio: CustodiosModel = {
    idCustodio: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: '',
    ci: ''
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<CustodioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.custodio = { ...data.custodio };
    }

  ngOnInit(): void {
    this.store.dispatch(new GetCustodio());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarCustodio() {
    this.store.dispatch(new UpdateCustodio(this.custodio)).subscribe({
      next: () => {
        this.openSnackBar('Custodio actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar custodio:', error);
        this.openSnackBar('No se pudo actualizar el custodio', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}
