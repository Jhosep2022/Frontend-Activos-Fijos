import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    this.store.dispatch(new AddPais(this.pais)).subscribe({
      next: () => {
        console.log('Pais agregado exitosamente');
        this.openSnackBar('Pais agregado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregar Pais:', error);
        this.openSnackBar('El Pais no se pudo agregar', 'Cerrar');
      }
    });
    this.pais = {
      idPais: 0,
      nombre: ''
    };
    this.cerrarDialog();
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  constructor(private store: Store, private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
  

}
