export interface ActivosModel {
    idActivo: number;
    nombre: string;
    valorActual: number;
    valorInicial: number;
    fechaRegistro: Date; // Usamos string para representar la fecha con formato ISO
    detalle: string;
    estado: boolean;
    precio: number;
    comprobanteCompra: string;
    estadoActivo: string;
    aulaId: number;
    //idBloque: number;
    categoriaId: number;
    custodioId: number;
    //idDepreciacion: number;
    //idEstadoactivo: number;
    //idIdentificador: number;
    proyectoId: number;
    idModelo: number;
}

export interface ActivosStringModel {
    idActivo: number;
    nombre: string;
    valorActual: number;
    valorInicial: number;
    fechaRegistro: Date; // Usamos string para representar la fecha con formato ISO
    detalle: string;
    estado: boolean;
    precio: number;
    comprobanteCompra: string;
    estadoActivo: string;
    aulaId: number;
    categoriaId: number;
    custodioId: number;
    proyectoId: number;
    idModelo: number;
    aulaIdstring: string;
    categoriaIdstring: string;
    custodioIdstring: string;
    proyectoIdstring: string;
    idModelostring: string;
}