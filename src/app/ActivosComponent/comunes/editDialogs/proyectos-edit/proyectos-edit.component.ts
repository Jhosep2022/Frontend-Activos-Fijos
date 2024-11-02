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
import { UpdateProyecto } from 'src/app/ActivosComponent/state-management/proyecto/proyecto.action';

@Component({
  selector: 'app-proyectos-edit',
  templateUrl: './proyectos-edit.component.html',
  styleUrls: ['./proyectos-edit.component.scss']
})
export class ProyectosEditComponent implements OnInit {
  areas$: Observable<AreaModel[]>; // Observable que contiene las áreas
  proyecto: ProyectoModel = {
    idProyecto: 0,
    nombre: '',
    codigoProyecto: '',
    fechaInicio: '',
    fechaFin: '',
    idArea: 1
  };

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProyectosEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar
  ) {
    this.areas$ = this.store.select(AreasState.getAreas);
    this.proyecto = {
      ...data.proyecto
    };
  }

  ngOnInit(): void {
    this.store.dispatch(new GetArea());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarProyecto() {
    this.store.dispatch(new UpdateProyecto(this.proyecto)).subscribe({
      next: () => {
        console.log('Proyecto actualizado exitosamente');
        this.openSnackBar('Proyecto actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar proyecto:', error);
        this.openSnackBar('El proyecto no se pudo actualizar', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}
