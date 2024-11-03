import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { RolModel } from '../../models/rol.model';
import { DivisaModel } from '../../models/divisa.model';
import { EstadosModel } from '../../models/estadosUso.model';
import { MarcaModel } from '../../models/marca.model';
import { ModeloModel } from '../../models/modelo.model';
import { AreaModel } from '../../models/area.model';
import { ProyectoModel } from '../../models/proyecto.model';
import { CategoriaModel } from '../../models/categorias.model';
import { CustodiosModel } from '../../models/custodios.model';
import { EmpresaModel } from '../../models/empresa.model';

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
  divisasCSV(divisasList: DivisaModel[]): void {
    const headers = [
      'ID Divisa',
      'Nombre',
      'Abreviación',
      'Valor'
    ];
  
    const csvData = [
      headers.join(','), // Encabezados
      ...divisasList.map(divisa => {
        return [
          divisa.idDivisa,
          divisa.nombre,
          divisa.abreviacion,
          divisa.valor.toString() // Convierte el valor a cadena para el CSV
        ].join(',');
      })
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'divisas.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  custodiosCSV(custodiosList: CustodiosModel[]): void {
    const headers = [
      'ID Custodio',
      'Nombre',
      'Apellido Paterno',
      'Apellido Materno',
      'Correo',
      'Teléfono',
      'CI'
    ];
  
    const csvData = [
      headers.join(','), // Encabezados
      ...custodiosList.map(custodio => {
        return [
          custodio.idCustodio,
          custodio.nombre,
          custodio.apellidoPaterno,
          custodio.apellidoMaterno,
          custodio.correo,
          custodio.telefono,
          custodio.ci
        ].join(',');
      })
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custodios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  categoriasCSV(categoriasList: CategoriaModel[]): void {
    const headers = [
      'ID Categoria',
      'Nombre',
      'Tiempo de Vida',
      'Coeficiente Anual'
    ];
  
    const csvData = [
      headers.join(','), // Encabezados
      ...categoriasList.map(categoria => [
        categoria.idCategoria,
        categoria.nombre,
        categoria.tiempoDeVida,
        categoria.coeficienteAnual
      ].join(','))
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'categorias.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  estadosUsoCSV(estadosList: EstadosModel[]): void {
    const headers = [
      'ID Estados',
      'Nombre',
      'Descripcion',
    ];
  
    const csvData = [
      headers.join(','), // Encabezados
      ...estadosList.map(estado => [
        estado.idEstado,
        estado.nombre,
        estado.descripcion
      ].join(','))
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estados-uso.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  marcasCSV(marcaslist: MarcaModel[]): void {
  const headers = [
    'ID Marca',
    'Nombre',
    'País de Origen',
    'Descripción',
    'Estado'
  ];

  const csvData = [
    headers.join(','), // Encabezados
    ...marcaslist.map(marca => [
      marca.idMarca,
      marca.nombre,
      marca.paisOrigen,
      marca.descripcion,
      marca.estado ? 'Activo' : 'Inactivo'
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'marcas.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}
modelosCSV(modeloslist: ModeloModel[], marcaslist: MarcaModel[]): void {
  const headers = [
    'ID Modelo',
    'Nombre',
    'Marca',
    'Descripción',
    'Estado'
  ];

  const csvData = [
    headers.join(','), // Encabezados
    ...modeloslist.map(modelo => {
      const marca = marcaslist.find(r => r.idMarca === modelo.marcaId);
      const marcaName = marca ? marca.nombre : 'Sin Marca';

      return [
        modelo.idModelo,
        modelo.nombre,
        marcaName,
        modelo.descripcion,
        modelo.estado ? 'Activo' : 'Inactivo'
      ].join(',')
    })
  ].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'modelos.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}
areasCSV(areasList: AreaModel[], empresalist: EmpresaModel[]): void {
  const headers = [
    'ID Área',
    'ID Empresa',
    'Nombre Área'
  ];

  const csvData = [
    headers.join(','), // Encabezados
    ...areasList.map(area => {
      const empresa = empresalist.find(r => r.idEmpresa === area.idEmpresa);
      const empresaName = empresa ? empresa.nombre : 'Sin Empresa';

      return [
        area.idArea,
        empresaName,
        area.nombre
      ].join(',')
    })
  ].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'areas.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

proyectosCSV(proyectoslist: ProyectoModel[], arealist: AreaModel[]): void {
  const headers = [
    'ID Proyecto',
    'Nombre',
    'Código Proyecto',
    'Fecha Inicio',
    'Fecha Fin',
    'ID Área'
  ];

  const csvData = [
    headers.join(','), // Encabezados
    ...proyectoslist.map(proyecto => {
      const areas = arealist.find(r => r.idArea === proyecto?.idArea);
      const areaName = areas ? areas.nombre : 'Sin Area';
      return [
        proyecto.idProyecto,
        proyecto.nombre,
        proyecto.codigoProyecto,
        proyecto.fechaInicio,
        proyecto.fechaFin,
        areaName
      ].join(',');
    })
  ].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'proyectos.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

  
}
