export interface PaisModel {
    idPais: number;
    nombre: string;
}

export interface DepartamentoModel {
    idDepartamento: number;
    nombre: string;
    idPais: number;
}

export interface ProvinciaModel {
    idProvincia: number;
    nombre: string;
    idDepartamento: number;
}

export interface MunicipioModel {
    idMunicipio: number;
    nombre: string;
    provinciaId: number;
}

export interface SucursalModel {
    idSucursal: number;
    nombre: string;
    municipioId: number;
}

export interface BloqueModel {
    idBloque: number;
    nombre: string;
    idSucursal: number;
    idDireccion: number;
}

export interface AulaModel {
    idAula: number;
    nombre: string;
    idBloque: number;
}

export interface DireccionModel {
    idDireccion: number;
    calle: string;
    detalle: string;
    zona: string;
}