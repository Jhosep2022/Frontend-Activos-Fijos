import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { UserModel } from '../../models/user.model';
import { RolModel } from '../../models/rol.model';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { DivisaModel } from '../../models/divisa.model';

@Injectable({
  providedIn: 'root'
})
export class PdfreportService {
  userpdf(userlist: UserModel[], rollist: RolModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Usuarios generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Correo', 'Estado', 'Telefono', 'Rol'];
    const data = userlist.map((user) => {
      const userRole = rollist.find(role => role.idRol === user.rolId);
      return [
        user.idUsuario,
        `${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}`,
        user.correo,
        user.estado ? 'Activo' : 'Inactivo',
        user.telefono,
        userRole ? userRole.nombre : 'Sin Rol',
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-activos.pdf');
  }

  divisapdf(divisalist: DivisaModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Divisas generado: '+new Date().toLocaleString(), 10, 10);
    var fecha = new Date().toLocaleString();
    //doc.text('/n Fecha de generacion: '+fecha, 10, 10);

    const columns = ['ID', 'Nombre','Valor (Bs.)','Abreviacion'];
    const data = divisalist.map((divisa, index) => [
      divisa.idDivisa,
      divisa.nombre,
      divisa.valor,
      divisa.abreviacion,
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    })

    doc.save('informe-divisas.pdf');
  }
}
