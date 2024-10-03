import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { BloqueModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddBloque } from 'src/app/ActivosComponent/state-management/ubicacion/bloque/bloque.actions';

@Component({
  selector: 'app-bloque-dialog',
  templateUrl: './bloque-dialog.component.html',
  styleUrls: ['./bloque-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BloqueDialogComponent implements OnInit {

  bloque: BloqueModel = {
    idBloque: 0,
    nombre: '',
    idSucursal: 0,
    idDireccion: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<BloqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  agregarBloque() {
    this.bloque.idSucursal = this.data.bloque.idSucursal;
    this.bloque.idDireccion = this.data.bloque.idDireccion;
    this.store.dispatch(new AddBloque(this.bloque));
    this.bloque = {
      idBloque: 0,
      nombre: '',
      idSucursal: 0,
      idDireccion: 0
    };
    this.cerrarDialog();
  }

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
