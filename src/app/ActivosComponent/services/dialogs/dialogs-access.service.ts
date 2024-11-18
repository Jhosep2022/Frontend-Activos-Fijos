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
import { UserModel } from '../../models/user.model';
import { UsuarioEditComponent } from '../../comunes/editDialogs/usuario-edit/usuario-edit.component';
import { DivisaModel } from '../../models/divisa.model';
import { DivisaEditComponent } from '../../comunes/editDialogs/divisa-edit/divisa-edit.component';
import { ActivosModel } from '../../models/activos.model';
import { ActivosEditComponent } from '../../comunes/editDialogs/activos-edit/activos-edit.component';
import { AreaModel } from '../../models/area.model';
import { AreasEditComponent } from '../../comunes/editDialogs/areas-edit/areas-edit.component';
import { CategoriaEditComponent } from '../../comunes/editDialogs/categoria-edit/categoria-edit.component';
import { CategoriaModel } from '../../models/categorias.model';
import { CustodiosModel } from '../../models/custodios.model';
import { CustodioEditComponent } from '../../comunes/editDialogs/custodio-edit/custodio-edit.component';
import { MarcaModel } from '../../models/marca.model';
import { MarcasEditComponent } from '../../comunes/editDialogs/marcas-edit/marcas-edit.component';
import { ModeloModel } from '../../models/modelo.model';
import { ModelosEditComponent } from '../../comunes/editDialogs/modelos-edit/modelos-edit.component';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectosEditComponent } from '../../comunes/editDialogs/proyectos-edit/proyectos-edit.component';
import { ConfirmacionDeleteComponent } from '../../comunes/addDialogs/confirmacion-delete/confirmacion-delete.component';
import { CustodioDialogComponent } from '../../comunes/addDialogs/custodio-dialog/custodio-dialog.component';
import { ProyectoDialogComponent } from '../../comunes/addDialogs/proyecto-dialog/proyecto-dialog.component';
import { ModeloDialogComponent } from '../../comunes/addDialogs/modelo-dialog/modelo-dialog.component';

export interface DialogData {
  pais: PaisModel;
  departamento: DepartamentoModel;
  provincia: ProvinciaModel;
  municipio: MunicipioModel;
  sucursal: SucursalModel;
  bloque: BloqueModel;
  aula: AulaModel;
  direccion: DireccionModel;
  //para actualizar
  usuario: UserModel;
  divisa: DivisaModel;
  activo: ActivosModel;
  area: AreaModel;
  categoria: CategoriaModel;
  custodio: CustodiosModel;
  marca: MarcaModel;
  modelo: ModeloModel;
  proyecto: ProyectoModel;
  //eliminar
  idelemento: number;
  tipo: string;
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

  //Funciones para eliminar
  eliminarElemento(idelemento: number, tipo: string): void {
    this.dialog.open(ConfirmacionDeleteComponent, {
      data: {
        idelemento: idelemento,
        tipo: tipo
      },
    });
  }

  //Funciones para editar
  actualizarUsuario(usuario: UserModel): void {
    this.dialog.open(UsuarioEditComponent, {
      data: {
        usuario: usuario
      },
    });
  }

  actualizarDivisa(divisa: DivisaModel): void {
    this.dialog.open(DivisaEditComponent, {
      data: {
        divisa: divisa
      },
    });
  }

  actualizarActivo(activo: ActivosModel): void {
    this.dialog.open(ActivosEditComponent, {
      data: {
        activo: activo
      },
    });
  }

  actualizarAreas(area: AreaModel): void {
    this.dialog.open(AreasEditComponent, {
      data: {
        area: area
      },
    });
  }

  actualizarCategoria(categoria: CategoriaModel): void {
    this.dialog.open(CategoriaEditComponent, {
      data: {
        categoria: categoria
      },
    });
  }

  actualizarCustodio(custodio: CustodiosModel): void {
    this.dialog.open(CustodioEditComponent, {
      data: {
        custodio: custodio
      },
    });
  }

  actualizarMarcas(marca: MarcaModel): void {
    this.dialog.open(MarcasEditComponent, {
      data: {
        marca: marca
      },
    });
  }

  actualizarModelo(modelo: ModeloModel): void {
    this.dialog.open(ModelosEditComponent, {
      data: {
        modelo: modelo
      },
    });
  }

  actualizarProyecto(proyecto: ProyectoModel): void {
    this.dialog.open(ProyectosEditComponent, {
      data: {
        proyecto: proyecto
      },
    });
  }

  //Funciones para agregar
  agregarCustodio(): void {
    this.dialog.open(CustodioDialogComponent);
  }
  agregarModelo(): void {
    this.dialog.open(ModeloDialogComponent);
  }
  agregarProyecto(): void {
    this.dialog.open(ProyectoDialogComponent);
  }
}
