import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  ngOnInit(): void {
  }

  agregarSucursal() {
    this.sucursal.municipioId = this.data.sucursal.municipioId;
    this.store.dispatch(new AddSucursal(this.sucursal));
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
