import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { MunicipioModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddMunicipio } from 'src/app/ActivosComponent/state-management/ubicacion/municipio/municipio.actions';

@Component({
  selector: 'app-municipio-dialog',
  templateUrl: './municipio-dialog.component.html',
  styleUrls: ['./municipio-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MunicipioDialogComponent implements OnInit {

  municipio: MunicipioModel = {
    idMunicipio: 0,
    nombre: '',
    provinciaId: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<MunicipioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  agregarMunicipio() {
    console.log("munici", this.municipio);
    this.municipio.provinciaId = this.data.municipio.provinciaId;
    this.store.dispatch(new AddMunicipio(this.municipio));
    this.municipio = {
      idMunicipio: 0,
      nombre: '',
      provinciaId: 0
    };
    this.cerrarDialog();
  }

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
