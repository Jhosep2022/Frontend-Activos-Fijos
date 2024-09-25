export interface HistorialActivos {
  idHistorial: number;
  accion: string;
  valorActual: number;
  fechaModificacion: Date;
  comprobante: string;
  detalle: string;
  estado: boolean;
  estadoUso: string;
  activoEntity: number;
  aulaEntity: number;
  custodioEntity: number;
  proyectoEntity: number;
  usuarioEntity: number;
}