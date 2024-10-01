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

@Injectable({
  providedIn: 'root'
})
export class DialogsAccessService {

  constructor(public dialog: MatDialog) {}

  paisDialog(): void {    
    this.dialog.open(PaisDialogComponent);
  }
  departamentoDialog(): void {    
    this.dialog.open(DepartamentoDialogComponent);
  }
  municipioDialog(): void {    
    this.dialog.open(MunicipioDialogComponent);
  }
  sucursalDialog(): void {    
    this.dialog.open(SucursalDialogComponent);
  }
  provinciaDialog(): void {    
    this.dialog.open(ProvinciaDialogComponent);
  }
  bloqueDialog(): void {    
    this.dialog.open(BloqueDialogComponent);
  }
  aulaDialog(): void {    
    this.dialog.open(AulaDialogComponent);
  }
  direccionDialog(): void {    
    this.dialog.open(DireccionDialogComponent);
  }
}
