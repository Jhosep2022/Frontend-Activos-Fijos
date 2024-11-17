import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CustodiosModel } from 'src/app/ActivosComponent/models/custodios.model';
import { ProyectoModel } from 'src/app/ActivosComponent/models/proyecto.model';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { AddCustodio, GetCustodio } from 'src/app/ActivosComponent/state-management/custodios/custodios.action';
import { CustodiosState } from 'src/app/ActivosComponent/state-management/custodios/custodios.state';
import { GetProyecto } from 'src/app/ActivosComponent/state-management/proyecto/proyecto.action';
import { ProyectoState } from 'src/app/ActivosComponent/state-management/proyecto/proyecto.state';
import { AulaDialogComponent } from '../../direccionDialogs/aula-dialog/aula-dialog.component';

@Component({
  selector: 'app-custodio-dialog',
  templateUrl: './custodio-dialog.component.html',
  styleUrls: ['./custodio-dialog.component.scss']
})
export class CustodioDialogComponent implements OnInit {
  proyectos$: Observable<ProyectoModel[]>; // Observable que contiene las empresas
  custodio: CustodiosModel = {
    idCustodio: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: '',
    ci: ''
  };
  custodios$: Observable<CustodiosModel[]>;

  agregarCustodio() {
    this.store.dispatch(new AddCustodio(this.custodio)).subscribe({
      next: () => {
        console.log('Custodio Registrado exitosamente');
        this.openSnackBar('Custodio Registrado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al Registrar Custodio:', error);
        this.openSnackBar('El Custodio no se pudo Registrar', 'Cerrar');
      }
    });
    this.custodio = {
      idCustodio: 0,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      telefono: '',
      ci: ''
    };
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<CustodioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.custodios$ = this.store.select(CustodiosState.getCustodios);
      this.proyectos$ = this.store.select(ProyectoState.getProyectos);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetCustodio(), new GetProyecto()]);
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}