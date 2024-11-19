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
import { CalcularDepreciacionService } from '../calcular-depreciacion.service';
import { ActivosModel } from '../../models/activos.model';
import { DepreciacionesModel } from '../../models/depreciaciones.model';
import { AulaModel, BloqueModel, DepartamentoModel, DireccionModel, MunicipioModel, PaisModel, ProvinciaModel, SucursalModel } from '../../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class CsvreportService {

  fechaDepreciar: Date = new Date();
  constructor(public calcularDepreciacionService: CalcularDepreciacionService) { }
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
//Aqui se guarda los formatos para realizar los reportes en pdf
activocsv(activolist: ActivosModel[], aulaslist: AulaModel[], bloqueslist: BloqueModel[], categoriaslist: CategoriaModel[], custodioslist: CustodiosModel[], depreciacioneslist: DepreciacionesModel[], estadoslist: EstadosModel[], proyectoslist: ProyectoModel[], modeloslist: ModeloModel[], arealist: AreaModel[], marcaslist: MarcaModel[], divisa: DivisaModel): void {
  const headers = ['ID', 'Nombre', 'Proyecto', 'Activo/Inactivo', 'Categoria', 'Modelo', 'Detalle', 'Fecha Registro', 'Valor Actual', 'Valor Inicial', 'Precio (Compra)', 'Comprobante Compra','Estado de Uso', 'Custodio', 'Aula'];
  
  const csvData = [
    headers.join(','), // Encabezados
    ...activolist.map(activo => {      
      const aulaActivo = aulaslist.find(aula => aula.idAula === activo.aulaId);
      const categoriaActivo = categoriaslist.find(categoria => categoria.idCategoria === activo.categoriaId);
      const custodioActivo = custodioslist.find(custodio => custodio.idCustodio === activo.custodioId);
      const proyectoActivo = proyectoslist.find(proyecto => proyecto.idProyecto === activo.proyectoId);
      const modeloActivo = modeloslist.find(modelo => modelo.idModelo === activo.idModelo);

      const areaProyecto = proyectoActivo ? arealist.find(area => area.idArea === proyectoActivo.idArea) : undefined;
      const marcaModelo = modeloActivo ? marcaslist.find(marca => marca.idMarca === modeloActivo.marcaId) : undefined;
      return [
        activo.idActivo,
        activo.nombre,
        proyectoActivo ? ((areaProyecto ? areaProyecto.nombre : 'Sin Area')+" - "+proyectoActivo.nombre) : 'Sin Proyecto',
        activo.estado ? 'Activo' : 'Inactivo',
        categoriaActivo ? categoriaActivo.nombre : 'Sin Categoria',
        modeloActivo ? ((marcaModelo ? marcaModelo.nombre : 'Sin Marca')+" - "+modeloActivo.nombre) : 'Sin Modelo',
        activo.detalle,
        new Date(activo.fechaRegistro).toISOString().slice(0, 10), // Convertimos a Date si es necesario
        this.calcularDepreciacionService.obtenerValorActual(activo.fechaRegistro, activo.valorInicial, activo.categoriaId, this.fechaDepreciar)/divisa.valor,
        activo.valorInicial/divisa.valor,
        activo.precio/divisa.valor,
        activo.comprobanteCompra,
        activo.estadoActivo,
        custodioActivo ? `${custodioActivo.nombre} ${custodioActivo.apellidoPaterno} ${custodioActivo.apellidoMaterno} - ${custodioActivo.ci}` : 'Sin Custodio',
        aulaActivo ? (aulaActivo.nombre+" ("+aulaActivo.codigoUbicacion+")") : 'Sin Aula',
      ].join(',');
    })
  ].join('\n');

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'activos.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

downloadCSV(filename: any, headers: any, data: any) {
  const csvContent = [headers.join(','), ...data].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

ubicacionescsv2( 
  paislist: PaisModel[], 
  departamentolist: DepartamentoModel[], 
  provincialist: ProvinciaModel[], 
  municipiolist: MunicipioModel[], 
  sucursallist: SucursalModel[], 
  bloquelist: BloqueModel[], 
  aulalist: AulaModel[], 
  direccionlist: DireccionModel[] 
) {
  // Países
  const paisHeaders = ['ID País', 'Nombre País'];
  const paisData = paislist.map(pais => [pais.idPais, pais.nombre].join(','));
  this.downloadCSV('pais.csv', paisHeaders, paisData);

  // Departamentos
  const departamentoHeaders = ['ID Departamento', 'Nombre Departamento', 'País'];
  const departamentoData = departamentolist.map(departamento => {
    const pais = paislist.find(p => p.idPais === departamento.idPais);
    return [departamento.idDepartamento, departamento.nombre, pais ? pais.nombre : 'Sin País'].join(',');
  });
  this.downloadCSV('departamento.csv', departamentoHeaders, departamentoData);

  // Provincias
  const provinciaHeaders = ['ID Provincia', 'Nombre Provincia', 'Departamento'];
  const provinciaData = provincialist.map(provincia => {
    const departamento = departamentolist.find(d => d.idDepartamento === provincia.idDepartamento);
    return [provincia.idProvincia, provincia.nombre, departamento ? departamento.nombre : 'Sin Departamento'].join(',');
  });
  this.downloadCSV('provincia.csv', provinciaHeaders, provinciaData);

  // Municipios
  const municipioHeaders = ['ID Municipio', 'Nombre Municipio', 'Provincia'];
  const municipioData = municipiolist.map(municipio => {
    const provincia = provincialist.find(p => p.idProvincia === municipio.provinciaId);
    return [municipio.idMunicipio, municipio.nombre, provincia ? provincia.nombre : 'Sin Provincia'].join(',');
  });
  this.downloadCSV('municipio.csv', municipioHeaders, municipioData);

  // Sucursales
  const sucursalHeaders = ['ID Sucursal', 'Nombre Sucursal', 'Municipio'];
  const sucursalData = sucursallist.map(sucursal => {
    const municipio = municipiolist.find(m => m.idMunicipio === sucursal.municipioId);
    return [sucursal.idSucursal, sucursal.nombre, municipio ? municipio.nombre : 'Sin Municipio'].join(',');
  });
  this.downloadCSV('sucursal.csv', sucursalHeaders, sucursalData);

  // Bloques
  const bloqueHeaders = ['ID Bloque', 'Nombre Bloque', 'Sucursal', 'Dirección'];
  const bloqueData = bloquelist.map(bloque => {
    const sucursal = sucursallist.find(s => s.idSucursal === bloque.idSucursal);
    const direccion = direccionlist.find(d => d.idDireccion === bloque.idDireccion);
    return [bloque.idBloque, bloque.nombre, sucursal ? sucursal.nombre : 'Sin Sucursal', direccion ? direccion.calle : 'Sin Dirección'].join(',');
  });
  this.downloadCSV('bloque.csv', bloqueHeaders, bloqueData);

  // Aulas
  const aulaHeaders = ['ID Aula', 'Nombre Aula', 'Bloque', 'Código Ubicación'];
  const aulaData = aulalist.map(aula => {
    const bloque = bloquelist.find(b => b.idBloque === aula.idBloque);
    return [aula.idAula, aula.nombre, bloque ? bloque.nombre : 'Sin Bloque', aula.codigoUbicacion].join(',');
  });
  this.downloadCSV('aula.csv', aulaHeaders, aulaData);

  // Direcciones
  const direccionHeaders = ['ID Dirección', 'Calle', 'Detalle', 'Zona'];
  const direccionData = direccionlist.map(direccion => [
    direccion.idDireccion,
    direccion.calle,
    direccion.detalle,
    direccion.zona
  ].join(','));
  this.downloadCSV('direccion.csv', direccionHeaders, direccionData);
}

ubicacionescsv(
  paislist: PaisModel[], 
  departamentolist: DepartamentoModel[], 
  provincialist: ProvinciaModel[], 
  municipiolist: MunicipioModel[], 
  sucursallist: SucursalModel[], 
  bloquelist: BloqueModel[], 
  aulalist: AulaModel[], 
  direccionlist: DireccionModel[]
) {
  const headers = [
    'Pais',
    'Departamento',
    'Municipio',
    'Provincia',
    'Sucursal',
    'Bloque',
    'Calle', 'Detalle', 'Zona',
    'Aula', 'Codigo Ubicacion'
  ];

  const csvData = [headers.join(',')];

  paislist.forEach(pais => {
    const departamentos = departamentolist.filter(departamento => departamento.idPais === pais.idPais);
    if (departamentos.length === 0) departamentos.push({
      nombre: '', idPais: pais.idPais,
      idDepartamento: 0
    });

    departamentos.forEach(departamento => {
      const provincias = provincialist.filter(provincia => provincia.idDepartamento === departamento.idDepartamento);
      if (provincias.length === 0) provincias.push({
        nombre: '', idDepartamento: departamento.idDepartamento,
        idProvincia: 0
      });

      provincias.forEach(provincia => {
        const municipios = municipiolist.filter(municipio => municipio.provinciaId === provincia.idProvincia);
        if (municipios.length === 0) municipios.push({
          nombre: '', provinciaId: provincia.idProvincia,
          idMunicipio: 0
        });

        municipios.forEach(municipio => {
          const sucursales = sucursallist.filter(sucursal => sucursal.municipioId === municipio.idMunicipio);
          if (sucursales.length === 0) sucursales.push({
            nombre: '', municipioId: municipio.idMunicipio,
            idSucursal: 0
          });

          sucursales.forEach(sucursal => {
            const bloques = bloquelist.filter(bloque => bloque.idSucursal === sucursal.idSucursal);
            if (bloques.length === 0) bloques.push({
              nombre: '', idSucursal: sucursal.idSucursal, idDireccion: 0,
              idBloque: 0
            });

            bloques.forEach(bloque => {
              const aulas = aulalist.filter(aula => aula.idBloque === bloque.idBloque);
              if (aulas.length === 0) aulas.push({
                nombre: '', idBloque: bloque.idBloque, codigoUbicacion: '',
                idAula: 0
              });

              const direccion = direccionlist.find(d => d.idDireccion === bloque.idDireccion);

              aulas.forEach(aula => {
                csvData.push([
                  pais.nombre,
                  departamento.nombre, 
                  provincia.nombre,
                  municipio.nombre,
                  sucursal.nombre,
                  bloque.nombre, 
                  direccion ? direccion.calle : '', direccion ? direccion.detalle : '', direccion ? direccion.zona : '',
                  aula.nombre, aula.codigoUbicacion,
                ].join(','));
              });
            });
          });
        });
      });
    });
  });

  // Crear y descargar el archivo CSV
  const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ubicaciones.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

  
}
