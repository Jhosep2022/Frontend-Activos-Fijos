import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { DireccionModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddDireccion } from 'src/app/ActivosComponent/state-management/ubicacion/direccion/direccion.actions';

@Component({
  selector: 'app-direccion-dialog',
  templateUrl: './direccion-dialog.component.html',
  styleUrls: ['./direccion-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DireccionDialogComponent implements OnInit {

  direccion: DireccionModel = {
    idDireccion: 0,
    calle: '',
    detalle: '',
    zona: ''
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<DireccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  ngOnInit(): void {
  }

  agregarDireccion() {
    this.store.dispatch(new AddDireccion(this.direccion));
    this.direccion = {
      idDireccion: 0,
      calle: '',
      detalle: '',
      zona: ''
    };
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
