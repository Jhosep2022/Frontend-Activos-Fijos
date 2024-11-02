import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AreaModel } from 'src/app/ActivosComponent/models/area.model';
import { EmpresaModel } from 'src/app/ActivosComponent/models/empresa.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { GetArea, UpdateArea } from 'src/app/ActivosComponent/state-management/area/area.action';
import { AreasState } from 'src/app/ActivosComponent/state-management/area/area.state';
import { GetEmpresa } from 'src/app/ActivosComponent/state-management/empresa/empresa-action';
import { EmpresasState } from 'src/app/ActivosComponent/state-management/empresa/empresa.state';
import { DireccionDialogComponent } from '../../direccionDialogs/direccion-dialog/direccion-dialog.component';

@Component({
  selector: 'app-areas-edit',
  templateUrl: './areas-edit.component.html',
  styleUrls: ['./areas-edit.component.scss']
})
export class AreasEditComponent implements OnInit {
  empresas$: Observable<EmpresaModel[]>; // Observable que contiene las empresas
  area: AreaModel = {
    idArea: 0,
    idEmpresa: 1,
    nombre: ''
  };
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<DireccionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.empresas$ = this.store.select(EmpresasState.getEmpresas);
      this.area = {
        idArea: data.area.idArea,
        idEmpresa: data.area.idEmpresa,
        nombre: data.area.nombre
      }
    }

  ngOnInit(): void {
    this.store.dispatch([new GetArea(), new GetEmpresa()]);
  }

  hide = true;
  
  actualizarArea() {
    this.store.dispatch(new UpdateArea(this.area)).subscribe({
      next: () => {
        console.log('Area Actualizada exitosamente');
        this.openSnackBar('Area Actualizada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al Actualizar Area:', error);
        this.openSnackBar('El Area no se pudo Actualizar', 'Cerrar');
      }
    });
    this.area = {
      idArea: 0,
      idEmpresa: 1,
      nombre: ''
    };
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

}