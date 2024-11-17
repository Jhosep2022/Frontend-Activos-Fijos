import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MarcaModel } from 'src/app/ActivosComponent/models/marca.model';
import { ModeloModel } from 'src/app/ActivosComponent/models/modelo.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetMarca } from 'src/app/ActivosComponent/state-management/marca/marca.action';
import { MarcaState } from 'src/app/ActivosComponent/state-management/marca/marca.state';
import { AddModelo, GetModelo } from 'src/app/ActivosComponent/state-management/modelo/modelo.action';
import { ModeloState } from 'src/app/ActivosComponent/state-management/modelo/modelo.state';

@Component({
  selector: 'app-modelo-dialog',
  templateUrl: './modelo-dialog.component.html',
  styleUrls: ['./modelo-dialog.component.scss']
})
export class ModeloDialogComponent implements OnInit {
  marcas$: Observable<MarcaModel[]>; // Observable que contiene los roles
  marcas: MarcaModel[] = [];
  modelo: ModeloModel = {
    idModelo: 0,
    nombre: '',
    marcaId: 0,
    descripcion: '',
    estado: true
  };
  
  agregarModelo() {
    this.store.dispatch(new AddModelo(this.modelo)).subscribe({
      next: () => {
        console.log('Modelo Registrado exitosamente');
        this.openSnackBar('Modelo Registrado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al Registrar Modelo:', error);
        this.openSnackBar('El Modelo no se pudo Registrar', 'Cerrar');
      }
    });
    this.modelo = {
      idModelo: 0,
      nombre: '',
      marcaId: 0,
      descripcion: '',
      estado: true
    };
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ModeloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      //this.modelos$ = this.store.select(ModeloState.getModelos);
      this.marcas$ = this.store.select(MarcaState.getMarcas);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetModelo(), new GetMarca()]);
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}