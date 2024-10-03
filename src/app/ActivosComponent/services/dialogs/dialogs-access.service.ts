import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaisDialogComponent } from '../../comunes/direccionDialogs/pais-dialog/pais-dialog.component';
import { AulaDialogComponent } from '../../comunes/direccionDialogs/aula-dialog/aula-dialog.component';
import { BloqueDialogComponent } from '../../comunes/direccionDialogs/bloque-dialog/bloque-dialog.component';
import { DepartamentoDialogComponent } from '../../comunes/direccionDialogs/departamento-dialog/departamento-dialog.component';
import { DireccionDialogComponent } from '../../comunes/direccionDialogs/direccion-dialog/direccion-dialog.component';
import { MunicipioDialogComponent } from '../../comunes/direccionDialogs/municipio-dialog/municipio-dialog.component';
import { ProvinciaDialogComponent } from '../../comunes/direccionDialogs/provincia-dialog/provincia-dialog.component';
import { SucursalDialogComponent } from '../../comunes/direccionDialogs/sucursal-dialog/sucursal-dialog.component';
import { AulaModel, BloqueModel, DepartamentoModel, DireccionModel, MunicipioModel, PaisModel, ProvinciaModel, SucursalModel } from '../../models/ubicacion.model';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

export interface DialogData {
  pais: PaisModel;
  departamento: DepartamentoModel;
  provincia: ProvinciaModel;
  municipio: MunicipioModel;
  sucursal: SucursalModel;
  bloque: BloqueModel;
  aula: AulaModel;
  direccion: DireccionModel;

}

@Injectable({
  providedIn: 'root'
})
export class DialogsAccessService {

  constructor(public dialog: MatDialog) {}

  paisDialog(pais: PaisModel): void {
    this.dialog.open(PaisDialogComponent, {
      data: {
        pais: pais
      },
    });
  }
  departamentoDialog(departamento: DepartamentoModel): void {
    this.dialog.open(DepartamentoDialogComponent, {
      data: {
        departamento: departamento
      },
    });
  }
  municipioDialog(municipio: MunicipioModel): void {
    this.dialog.open(MunicipioDialogComponent, {
      data: {
        municipio: municipio
      },
    });
  }
  sucursalDialog(sucursal: SucursalModel): void {
    this.dialog.open(SucursalDialogComponent, {
      data: {
        sucursal: sucursal
      },
    });
  }
  provinciaDialog(provincia: ProvinciaModel): void {
    this.dialog.open(ProvinciaDialogComponent, {
      data: {
        provincia: provincia
      },
    });
  }
  bloqueDialog(bloque: BloqueModel): void {
    this.dialog.open(BloqueDialogComponent, {
      data: {
        bloque: bloque
      },
    });
  }
  aulaDialog(aula: AulaModel): void {
    this.dialog.open(AulaDialogComponent, {
      data: {
        aula: aula
      },
    });
  }
  direccionDialog(direccion: DireccionModel): void {
    this.dialog.open(DireccionDialogComponent, {
      data: {
        direccion: direccion
      },
    });
  }
}
