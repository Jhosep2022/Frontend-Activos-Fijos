import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { DepartamentoModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddDepartamento } from 'src/app/ActivosComponent/state-management/ubicacion/departamento/departamento.actions';

@Component({
  selector: 'app-departamento-dialog',
  templateUrl: './departamento-dialog.component.html',
  styleUrls: ['./departamento-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DepartamentoDialogComponent implements OnInit {

  departamento: DepartamentoModel = {
    idDepartamento: 0,
    nombre: '',
    idPais: 0
  };
  
  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<DepartamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  ngOnInit(): void {
  }

  agregarDepartamento() {
    this.departamento.idPais = this.data.departamento.idPais;
    this.store.dispatch(new AddDepartamento(this.departamento));
    this.departamento = {
      idDepartamento: 0,
      nombre: '',
      idPais: 0
    };
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}
