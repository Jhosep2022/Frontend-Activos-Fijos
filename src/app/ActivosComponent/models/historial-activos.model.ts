export interface HistorialActivosModel {
  idHistorial: number;
  accion: string;
  valorActual: number;
  fechaModificacion: Date;
  comprobante: string;
  detalle: string;
  estado: boolean;
  estadoUso: string;
  idActivo: number;
  idAula: number;
  idCustodio: number;
  idProyecto: number;
  idUsuario: number;
}