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
    idAula: number;
    idBloque: number;
    idCategoria: number;
    idCustodio: number;
    idDepreciacion: number;
    idEstadoactivo: number;
    //idIdentificador: number;
    idProyecto: number;
}