import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { PaisModel } from 'src/app/ActivosComponent/models/ubicacion.model';
import { AddPais, DeletePais } from 'src/app/ActivosComponent/state-management/ubicacion/pais/pais.actions';

@Component({
  selector: 'app-pais-dialog',
  templateUrl: './pais-dialog.component.html',
  styleUrls: ['./pais-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaisDialogComponent implements OnInit {
  pais: PaisModel = {
    idPais: 0,
    nombre: ''
  };

  agregarPais() {
    this.store.dispatch(new AddPais(this.pais));
    this.pais = {
      idPais: 0,
      nombre: ''
    };
    this.cerrarDialog();
  }
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
  

}
