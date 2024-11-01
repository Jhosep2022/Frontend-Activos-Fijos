import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { RolModel } from '../../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class CsvreportService {

  constructor() { }
  usuariosCSV(usuarioslist: UserModel[], roleslist: RolModel[]): void {
    const headers = [
      'ID Usuario',
      'Nombre',
      'Apellido Paterno',
      'Apellido Materno',
      'Correo',
      'Estado',
      'Telefono',
      'Rol'
    ];

    const csvData = [
      headers.join(','), // Encabezados
      ...usuarioslist.map(usuario => {
        // Encuentra el rol correspondiente al rolId del usuario
        const rol = roleslist.find(r => r.idRol === usuario.rolId);
        const rolName = rol ? rol.nombre : 'Sin Rol';

        return [
          usuario.idUsuario,
          usuario.nombre,
          usuario.apellidoPaterno,
          usuario.apellidoMaterno,
          usuario.correo,
          usuario.estado ? 'Activo' : 'Inactivo',
          usuario.telefono.toString(),
          rolName // Agrega el nombre del rol en lugar de rolId
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
