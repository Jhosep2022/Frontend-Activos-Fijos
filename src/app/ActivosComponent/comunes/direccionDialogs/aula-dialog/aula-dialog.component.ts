import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AulaModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddAula } from 'src/app/ActivosComponent/state-management/ubicacion/aula/aula.actions';

@Component({
  selector: 'app-aula-dialog',
  templateUrl: './aula-dialog.component.html',
  styleUrls: ['./aula-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AulaDialogComponent implements OnInit {

  aula: AulaModel = {
    idAula: 0,
    nombre: '',
    idBloque: 0
  };

  agregarAula() {
    this.aula.idBloque = this.data.aula.idBloque;
    this.store.dispatch(new AddAula(this.aula));
    this.aula = {
      idAula: 0,
      nombre: '',
      idBloque: 0
    };
    this.cerrarDialog();
  }

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<AulaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}