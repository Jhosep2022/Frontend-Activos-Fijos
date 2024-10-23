import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { UserModel } from '../../models/user.model';
import { RolModel } from '../../models/rol.model';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { DivisaModel } from '../../models/divisa.model';
import { EmpresaModel } from '../../models/empresa.model';
import { AreaModel } from '../../models/area.model';
import { ProyectoModel } from '../../models/proyecto.model';
import { CustodiosModel } from '../../models/custodios.model';
import { CategoriaModel } from '../../models/categorias.model';
import { AulaModel, BloqueModel, DepartamentoModel, DireccionModel, MunicipioModel, PaisModel, ProvinciaModel, SucursalModel } from '../../models/ubicacion.model';
import { IdentificadoresModel } from '../../models/identificadores.model';
import { ActivosModel } from '../../models/activos.model';
import { EstadosModel } from '../../models/estadosUso.model';
import { MarcaModel } from '../../models/marca.model';
import { ModeloModel } from '../../models/modelo.model';
import { DepreciacionesModel } from '../../models/depreciaciones.model';

@Injectable({
  providedIn: 'root'
})
export class PdfreportService {
  //Aqui se guarda los formatos para realizar los reportes en pdf
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

  empresapdf(empresalist: EmpresaModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Empresas generado: '+new Date().toLocaleString(), 10, 10);
    var fecha = new Date().toLocaleString();
    //doc.text('/n Fecha de generacion: '+fecha, 10, 10);

    const columns = ['ID', 'Nombre','Direccion','Nit','telefono'];
    const data = empresalist.map((empresa, index) => [
      empresa.idEmpresa,
      empresa.nombre,
      empresa.direccion,
      empresa.nit,
      empresa.telefono,
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    })

    doc.save('informe-empresas.pdf');
  }

  areapdf(arealist: AreaModel[], empresalist: EmpresaModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Areas generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Empresa'];
    const data = arealist.map((area) => {
      const empresaArea = empresalist.find(empresa => empresa.idEmpresa === area.idEmpresa);
      return [
        area.idArea,
        area.nombre,
        empresaArea ? empresaArea.nombre : 'Sin Empresa',
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-area.pdf');
  }

  proyectopdf(proyectolist: ProyectoModel[], arealist: AreaModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Proyectos generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Fecha Inicio', 'Fecha Fin', 'Area'];
    const data = proyectolist.map((proyecto) => {
      const proyectoArea = proyectolist.find(area => area.idArea === proyecto.idArea);
      return [
        proyecto.idProyecto,
        proyecto.nombre,
        proyecto.fechaInicio,
        proyecto.fechaFin,
        proyectoArea ? proyectoArea.nombre : 'Sin Area',
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-proyecto.pdf');
  }

  custodiospdf(custodioslist: CustodiosModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Custodios generado: '+new Date().toLocaleString(), 10, 10);
    var fecha = new Date().toLocaleString();
    //doc.text('/n Fecha de generacion: '+fecha, 10, 10);

    const columns = ['ID', 'Nombre Completo','Correo','telefono','ci'];
    const data = custodioslist.map((custodio, index) => [
      custodio.idCustodio,
      custodio.nombre+' '+custodio.apellidoPaterno+' '+custodio.apellidoMaterno,
      custodio.correo,
      custodio.telefono,
      custodio.ci
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    })

    doc.save('informe-custodio.pdf');
  }

  categoriaspdf(categorialist: CategoriaModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Categorias generado: '+new Date().toLocaleString(), 10, 10);
    var fecha = new Date().toLocaleString();
    //doc.text('/n Fecha de generacion: '+fecha, 10, 10);

    const columns = ['ID', 'Nombre'];
    const data = categorialist.map((categoria, index) => [
      categoria.idCategoria,
      categoria.nombre,
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    })

    doc.save('informe-custodio.pdf');
  }

  ubicacionespdf(
    paislist: PaisModel[], 
    departamentolist: DepartamentoModel[], 
    provincialist: ProvinciaModel[], 
    municipiolist: MunicipioModel[], 
    sucursallist: SucursalModel[], 
    bloquelist: BloqueModel[], 
    aulalist: AulaModel[], 
    direccionlist: DireccionModel[]
  ) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Ubicación generado: ' + new Date().toLocaleString(), 10, 10);
  
    const paiscolumns = ['ID', 'Nombre'];
    const departamentocolumns = ['ID', 'Nombre', 'idPais'];
    const provinciacolumns = ['ID', 'Nombre', 'idDepartamento'];
    const municipiocolumns = ['ID', 'Nombre', 'provinciaId'];
    const sucursalcolumns = ['ID', 'Nombre', 'municipioId'];
    const bloquecolumns = ['ID', 'Nombre', 'idSucursal', 'idDireccion'];
    const aulacolumns = ['ID', 'Nombre', 'idBloque'];
    const direccioncolumns = ['ID', 'Calle', 'Detalle', 'Zona'];
  
    const paisdata = paislist.map((pais) => [
      pais.idPais,
      pais.nombre,
    ]);
    
    const departamentodata = departamentolist.map((departamento) => {
      const paises = paislist.find(pais => pais.idPais === departamento.idPais);
      return [
        departamento.idDepartamento,
        departamento.nombre,
        paises ? paises.nombre : 'Sin Area',
      ];
    });

    const provinciadata = provincialist.map((provincia) => {
      const departamentos = departamentolist.find(departamento => departamento.idDepartamento === provincia.idDepartamento);
      return [
        provincia.idProvincia,
        provincia.nombre,
        departamentos ? departamentos.nombre : 'Sin Area',
      ];
    });
    const municipiodata = municipiolist.map((municipio) => {
      const provincias = provincialist.find(provincia => provincia.idProvincia === municipio.provinciaId);
      return [
        municipio.idMunicipio,
        municipio.nombre,
        provincias ? provincias.nombre : 'Sin Area',
      ];
    });
    const sucursaldata = sucursallist.map((sucursal) => {
      const municipios = municipiolist.find(municipio => municipio.idMunicipio === sucursal.municipioId);
      return [
        sucursal.idSucursal,
        sucursal.nombre,
        municipios ? municipios.nombre : 'Sin Area',
      ];
    });
    const bloquedata = bloquelist.map((bloque) => {
      const sucursales = sucursallist.find(sucursal => sucursal.idSucursal === bloque.idSucursal);
      const direcciones = direccionlist.find(direccion => direccion.idDireccion === bloque.idDireccion);
      return [
        bloque.idBloque,
        bloque.nombre,
        sucursales ? sucursales.nombre : 'Sin Area',
        direcciones ? direcciones.calle : 'Sin Area',
      ];
    });
    const auladata = aulalist.map((aula) => {
      const bloques = bloquelist.find(bloque => bloque.idBloque === aula.idBloque);
      return [
        aula.idAula,
        aula.nombre,
        bloques ? bloques.nombre : 'Sin Area',
      ];
    });
    const direcciondata = direccionlist.map((direccion) => [
      direccion.idDireccion,
      direccion.calle,
      direccion.detalle,
      direccion.zona,
    ]);
  
    let yOffset = 20;
  
    doc.text('Países', 10, yOffset);
    autoTable(doc, {
      head: [paiscolumns],
      body: paisdata,
      startY: yOffset + 5
    });
  
    yOffset = (doc as any).autoTable.previous.finalY + 10; // Corregido
    doc.text('Departamentos', 10, yOffset);
    autoTable(doc, {
      head: [departamentocolumns],
      body: departamentodata,
      startY: yOffset + 5
    });
  
    yOffset = (doc as any).autoTable.previous.finalY + 10; // Corregido
    doc.text('Provincias', 10, yOffset);
    autoTable(doc, {
      head: [provinciacolumns],
      body: provinciadata,
      startY: yOffset + 5
    });
  
    yOffset = (doc as any).autoTable.previous.finalY + 10; // Corregido
    doc.text('Municipios', 10, yOffset);
    autoTable(doc, {
      head: [municipiocolumns],
      body: municipiodata,
      startY: yOffset + 5
    });
  
    yOffset = (doc as any).autoTable.previous.finalY + 10; // Corregido
    doc.text('Sucursales', 10, yOffset);
    autoTable(doc, {
      head: [sucursalcolumns],
      body: sucursaldata,
      startY: yOffset + 5
    });
  
    yOffset = (doc as any).autoTable.previous.finalY + 10; // Corregido
    doc.text('Bloques', 10, yOffset);
    autoTable(doc, {
      head: [bloquecolumns],
      body: bloquedata,
      startY: yOffset + 5
    });
  
    yOffset = (doc as any).autoTable.previous.finalY + 10; // Corregido
    doc.text('Aulas', 10, yOffset);
    autoTable(doc, {
      head: [aulacolumns],
      body: auladata,
      startY: yOffset + 5
    });
  
    yOffset = (doc as any).autoTable.previous.finalY + 10; // Corregido
    doc.text('Direcciones', 10, yOffset);
    autoTable(doc, {
      head: [direccioncolumns],
      body: direcciondata,
      startY: yOffset + 5
    });
  
    doc.save('informe-Ubicaciones.pdf');
  }
  
  identificadorespdf(identificadoreslist: IdentificadoresModel[], activolist: ActivosModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Identificadores generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Fecha Inicio', 'Fecha Fin', 'Area'];
    const data = identificadoreslist.map((identificador) => {
      const identificadorActivo = activolist.find(activo => activo.idActivo === identificador.idActivo);
      return [
        identificador.idIdentificador,
        identificador.codigoQr,
        identificador.codigoBarra,
        identificadorActivo ? identificadorActivo.nombre : 'Sin Activo',
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-proyecto.pdf');
  }

  estadospdf(estadoslist: EstadosModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Estados de Uso generado: '+new Date().toLocaleString(), 10, 10);
    var fecha = new Date().toLocaleString();
    //doc.text('/n Fecha de generacion: '+fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Descripcion'];
    const data = estadoslist.map((estados, index) => [
      estados.idEstado,
      estados.nombre,
      estados.descripcion
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    })

    doc.save('informe-estados.pdf');
  }

  modelospdf(modeloslist: ModeloModel[], marcalist: MarcaModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Modelos generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Fecha Inicio', 'Fecha Fin', 'Area'];
    const data = modeloslist.map((modelo) => {
      const marcas = marcalist.find(marca => marca.idMarca === modelo.marcaId);
      return [
        modelo.idModelo,
        modelo.nombre,
        modelo.descripcion,
        modelo.estado ? 'Activo' : 'Inactivo',
        marcas ? marcas.nombre : 'Sin Marca',
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-proyecto.pdf');
  }

  marcaspdf(marcalist: MarcaModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Marcas generado: '+new Date().toLocaleString(), 10, 10);
    var fecha = new Date().toLocaleString();
    //doc.text('/n Fecha de generacion: '+fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Descripcion', 'Estado', 'Pais Origen'];
    const data = marcalist.map((marcas, index) => [
      marcas.idMarca,
      marcas.nombre,
      marcas.descripcion,
      marcas.estado ? 'Activo' : 'Inactivo',
      marcas.paisOrigen,
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    })

    doc.save('informe-marcas.pdf');
  }
  //Aqui se guarda los formatos para realizar los reportes en pdf
  activopdf(activolist: ActivosModel[], aulaslist: AulaModel[], bloqueslist: BloqueModel[], categoriaslist: CategoriaModel[], custodioslist: CustodiosModel[], depreciacioneslist: DepreciacionesModel[], estadoslist: EstadosModel[], proyectoslist: ProyectoModel[], modeloslist: ModeloModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Activos generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Valor Actual', 'Valor Inicial', 'Fecha Registro', 'Detalle', 'Activo/Inactivo', 'Precio', 'ComprobanteCompra','Estado de Uso', 'Custodio', 'Categoria', 'Depreciacion', 'Estado Uso', 'Proyecto', 'Modelo', 'Aula', 'Bloque'];
    const data = activolist.map((activo) => {
      const aulaActivo = aulaslist.find(aula => aula.idAula === activo.idAula);
      const bloqueActivo = bloqueslist.find(bloque => bloque.idBloque === activo.idBloque);
      const categoriaActivo = categoriaslist.find(categoria => categoria.idCategoria === activo.idCategoria);
      const custodioActivo = custodioslist.find(custodio => custodio.idCustodio === activo.idCustodio);
      const depreciacionActivo = depreciacioneslist.find(depreciacion => depreciacion.idDepreciacion === activo.idDepreciacion);
      const estadoActivo = estadoslist.find(estado => estado.idEstado === activo.idEstadoactivo);
      const proyectoActivo = proyectoslist.find(proyecto => proyecto.idProyecto === activo.idProyecto);
      const modeloActivo = modeloslist.find(modelo => modelo.idModelo === activo.idModelo);
      return [
        activo.idActivo,
        activo.nombre,
        activo.valorActual,
        activo.valorInicial,
        activo.fechaRegistro.toString(),
        activo.detalle,
        activo.estado ? 'Activo' : 'Inactivo',
        activo.precio,
        activo.comprobanteCompra,
        estadoActivo ? estadoActivo.nombre : 'Sin Estado',
        custodioActivo ? `${custodioActivo.nombre} ${custodioActivo.apellidoPaterno} ${custodioActivo.apellidoMaterno}` : 'Sin Custodio',
        categoriaActivo ? categoriaActivo.nombre : 'Sin Categoria',
        depreciacionActivo ? depreciacionActivo.metodo : 'Sin Depreciacion',
        proyectoActivo ? proyectoActivo.nombre : 'Sin Proyecto',
        modeloActivo ? modeloActivo.nombre : 'Sin Modelo',
        aulaActivo ? aulaActivo.nombre : 'Sin Aula',
        bloqueActivo ? bloqueActivo.nombre : 'Sin Bloque',
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-activos.pdf');
  }
}
