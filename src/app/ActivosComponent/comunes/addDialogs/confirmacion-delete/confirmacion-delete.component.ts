import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { DialogData } from 'src/app/ActivosComponent/services/dialogs/dialogs-access.service';
import { DeleteActivo } from 'src/app/ActivosComponent/state-management/activos/activos.action';
import { DeleteArea } from 'src/app/ActivosComponent/state-management/area/area.action';
import { DeleteCategoria } from 'src/app/ActivosComponent/state-management/categoria/categoria.action';
import { DeleteCustodio } from 'src/app/ActivosComponent/state-management/custodios/custodios.action';
import { DeleteCurrency } from 'src/app/ActivosComponent/state-management/divisa/divisa.action';
import { DeleteEstado } from 'src/app/ActivosComponent/state-management/estado/estado.action';
import { DeleteIdentificador } from 'src/app/ActivosComponent/state-management/identificadores/identificadores.action';
import { DeleteMarca } from 'src/app/ActivosComponent/state-management/marca/marca.action';
import { DeleteModelo } from 'src/app/ActivosComponent/state-management/modelo/modelo.action';
import { DeleteProyecto } from 'src/app/ActivosComponent/state-management/proyecto/proyecto.action';
import { DeleteRol } from 'src/app/ActivosComponent/state-management/rol/rol.actions';
import { DeleteAula } from 'src/app/ActivosComponent/state-management/ubicacion/aula/aula.actions';
import { DeleteBloque } from 'src/app/ActivosComponent/state-management/ubicacion/bloque/bloque.actions';
import { DeleteDepartamento } from 'src/app/ActivosComponent/state-management/ubicacion/departamento/departamento.actions';
import { DeleteDireccion } from 'src/app/ActivosComponent/state-management/ubicacion/direccion/direccion.actions';
import { DeleteMunicipio } from 'src/app/ActivosComponent/state-management/ubicacion/municipio/municipio.actions';
import { DeletePais } from 'src/app/ActivosComponent/state-management/ubicacion/pais/pais.actions';
import { DeleteProvincia } from 'src/app/ActivosComponent/state-management/ubicacion/provincia/provincia.actions';
import { DeleteSucursal } from 'src/app/ActivosComponent/state-management/ubicacion/sucursal/sucursal.actions';
import { DeleteUser } from 'src/app/ActivosComponent/state-management/user/user.actions';

@Component({
  selector: 'app-confirmacion-delete',
  templateUrl: './confirmacion-delete.component.html',
  styleUrls: ['./confirmacion-delete.component.scss']
})
export class ConfirmacionDeleteComponent implements OnInit {
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmacionDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
    }

  ngOnInit(): void {
  }

  eliminarElemento(id: number, tipo: string) {
    switch (tipo) {
      case 'Activo':
        this.eliminarActivo(id);
        break;
      case 'Custodio':
        this.eliminarCustodio(id);
        break;
      case 'Marca':
        this.eliminarMarcas(id);
        break;
      case 'Modelo':
        this.eliminarModelo(id);
        break;
      case 'Estado':
        this.eliminarEstadoUso(id);
        break;
      case 'Identificador':
        this.eliminarIdentificador(id);
        break;
      case 'Area':
        this.eliminarArea(id);
        break;
      case 'Proyecto':
        this.eliminarProyecto(id);
        break;
      case 'Pais':
        this.eliminarPais(id);
        break;
      case 'Departamento':
        this.eliminarDepartamento(id);
        break;
      case 'Municipio':
        this.eliminarMunicipio(id);
        break;
      case 'Provincia':
        this.eliminarProvincia(id);
        break;
      case 'Sucursal':
        this.eliminarSucursal(id);
        break;
      case 'Direccion':
        this.eliiminarDireccion(id);
        break;
      case 'Bloque':
        this.eliminarBloque(id);
        break;
      case 'Aula':
        this.eliminarAula(id);
        break;
      case 'Usuario':
        this.eliminarUsuario(id);
        break;
      case 'Categoria':
        this.eliminarCategoria(id);
        break;
      case 'Rol':
        this.eliminarRol(id);
        break;
      case 'Divisa':
        this.eliminarDivisa(id);
        break;
      default:
        break;
    }
    this.cerrarDialog();
  }

  cancelar(){
    this.cerrarDialog();
    this.openSnackBar('Operación cancelada', 'Cerrar');
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }

  eliminarActivo(id: number) {
    this.store.dispatch(new DeleteActivo(id)).subscribe({
      next: () => {
        console.log('Activo eliminado exitosamente');
        this.openSnackBar('Activo eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Activo:', error);
        this.openSnackBar('El Activo no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarDivisa(id: number) {
    this.store.dispatch(new DeleteCurrency(id)).subscribe({
      next: () => {
        console.log('Divisa eliminado exitosamente');
        this.openSnackBar('Divisa eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Divisa:', error);
        this.openSnackBar('El Divisa no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarRol(id: number) {
    this.store.dispatch(new DeleteRol(id)).subscribe({
      next: () => {
        console.log('Rol eliminado exitosamente');
        this.openSnackBar('Rol eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Rol:', error);
        this.openSnackBar('El Rol no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarUsuario(id: number) {
    this.store.dispatch(new DeleteUser(id)).subscribe({
      next: () => {
        console.log('Usuario eliminado exitosamente');
        this.openSnackBar('Usuario eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Usuario:', error);
        this.openSnackBar('El Usuario no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarCategoria(id: number) {
    this.store.dispatch(new DeleteCategoria(id)).subscribe({
      next: () => {
        console.log('Categoria eliminado exitosamente');
        this.openSnackBar('Categoria eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Categoria:', error);
        this.openSnackBar('El Categoria no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarCustodio(id: number) {
    this.store.dispatch(new DeleteCustodio(id)).subscribe({
      next: () => {
        console.log('Custodio eliminado exitosamente');
        this.openSnackBar('Custodio eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Custodio:', error);
        this.openSnackBar('El Custodio no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarMarcas(id: number) {
    this.store.dispatch(new DeleteMarca(id)).subscribe({
      next: () => {
        console.log('Marca eliminado exitosamente');
        this.openSnackBar('Marca eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Marca:', error);
        this.openSnackBar('El Marca no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarModelo(id: number) {
    this.store.dispatch(new DeleteModelo(id)).subscribe({
      next: () => {
        console.log('Modelo eliminado exitosamente');
        this.openSnackBar('Modelo eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Modelo:', error);
        this.openSnackBar('El Modelo no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarEstadoUso(id: number) {
    this.store.dispatch(new DeleteEstado(id)).subscribe({
      next: () => {
        console.log('Estado de uso eliminado exitosamente');
        this.openSnackBar('Estado de uso eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Estado de uso:', error);
        this.openSnackBar('El Estado de uso no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarIdentificador(id: number) {
    this.store.dispatch(new DeleteIdentificador(id)).subscribe({
      next: () => {
        console.log('Identificador eliminado exitosamente');
        this.openSnackBar('Identificador eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Identificador:', error);
        this.openSnackBar('El Identificador no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarArea(id: number) {
    this.store.dispatch(new DeleteArea(id)).subscribe({
      next: () => {
        console.log('Area eliminado exitosamente');
        this.openSnackBar('Area eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Area:', error);
        this.openSnackBar('El Area no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarProyecto(id: number) {
    this.store.dispatch(new DeleteProyecto(id)).subscribe({
      next: () => {
        console.log('Proyecto eliminado exitosamente');
        this.openSnackBar('Proyecto eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Proyecto:', error);
        this.openSnackBar('El Proyecto no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarPais(id: number) {
    this.store.dispatch(new DeletePais(id)).subscribe({
      next: () => {
        console.log('Pais eliminado exitosamente');
        this.openSnackBar('Pais eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Pais:', error);
        this.openSnackBar('El Pais no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarDepartamento(id: number) {
    this.store.dispatch(new DeleteDepartamento(id)).subscribe({
      next: () => {
        console.log('Departamento eliminado exitosamente');
        this.openSnackBar('Departamento eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Departamento:', error);
        this.openSnackBar('El Departamento no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarMunicipio(id: number) {
    this.store.dispatch(new DeleteMunicipio(id)).subscribe({
      next: () => {
        console.log('Municipio eliminado exitosamente');
        this.openSnackBar('Municipio eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Municipio:', error);
        this.openSnackBar('El Municipio no se pudo eliminar', 'Cerrar');
      }
    });
  } 

  eliminarProvincia(id: number) {
    this.store.dispatch(new DeleteProvincia(id)).subscribe({
      next: () => {
        console.log('Provincia eliminado exitosamente');
        this.openSnackBar('Provincia eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Provincia:', error);
        this.openSnackBar('El Provincia no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarSucursal(id: number) {
    this.store.dispatch(new DeleteSucursal(id)).subscribe({
      next: () => {
        console.log('Sucursal eliminado exitosamente');
        this.openSnackBar('Sucursal eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Sucursal:', error);
        this.openSnackBar('El Sucursal no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliiminarDireccion(id: number) {
    this.store.dispatch(new DeleteDireccion(id)).subscribe({
      next: () => {
        console.log('Direccion eliminado exitosamente');
        this.openSnackBar('Direccion eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Direccion:', error);
        this.openSnackBar('El Direccion no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarBloque(id: number) {
    this.store.dispatch(new DeleteBloque(id)).subscribe({
      next: () => {
        console.log('Bloque eliminado exitosamente');
        this.openSnackBar('Bloque eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Bloque:', error);
        this.openSnackBar('El Bloque no se pudo eliminar', 'Cerrar');
      }
    });
  }

  eliminarAula(id: number) {
    this.store.dispatch(new DeleteAula(id)).subscribe({
      next: () => {
        console.log('Aula eliminado exitosamente');
        this.openSnackBar('Aula eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Aula:', error);
        this.openSnackBar('El Aula no se pudo eliminar', 'Cerrar');
      }
    });
  }
}