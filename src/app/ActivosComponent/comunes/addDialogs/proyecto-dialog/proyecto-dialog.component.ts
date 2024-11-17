import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/ActivosComponent/models/area.model';
import { ProyectoModel } from 'src/app/ActivosComponent/models/proyecto.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetArea } from 'src/app/ActivosComponent/state-management/area/area.action';
import { AreasState } from 'src/app/ActivosComponent/state-management/area/area.state';
import { AddProyecto, GetProyecto } from 'src/app/ActivosComponent/state-management/proyecto/proyecto.action';
import { ProyectoState } from 'src/app/ActivosComponent/state-management/proyecto/proyecto.state';

@Component({
  selector: 'app-proyecto-dialog',
  templateUrl: './proyecto-dialog.component.html',
  styleUrls: ['./proyecto-dialog.component.scss']
})
export class ProyectoDialogComponent implements OnInit {
  areas$: Observable<AreaModel[]>; // Observable que contiene los roles
  areas: AreaModel[] = [];
  proyecto: ProyectoModel = {
    idProyecto: 0,
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    idArea: 0,
    codigoProyecto: ''
  };

  agregarProyecto() {
    this.store.dispatch(new AddProyecto(this.proyecto)).subscribe({
      next: () => {
        console.log('Proyecto Registrado exitosamente');
        this.openSnackBar('Proyecto Registrado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al Registrar Proyecto:', error);
        this.openSnackBar('El Proyecto no se pudo Registrar', 'Cerrar');
      }
    });
    this.proyecto = {
      idProyecto: 0,
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      idArea: 0,
      codigoProyecto: ''
    };
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProyectoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      //this.proyectos$ = this.store.select(ProyectoState.getProyectos);
      this.areas$ = this.store.select(AreasState.getAreas);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetProyecto(), new GetArea()]);
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}