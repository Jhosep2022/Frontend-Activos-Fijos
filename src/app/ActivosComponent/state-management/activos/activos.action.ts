export class GetActivo {
    static readonly type = '[Activo] Get Activo';
}

export class AddActivo {
    static readonly type = '[Activo] Add Activo';
    constructor(public payload: any) {}
}

export class UpdateActivo {
  static readonly type = '[Activo] Update Activo';
  constructor(public payload: any) {}
}

export class DeleteActivo {
  static readonly type = '[Activo] Delete Activo';
  constructor(public id: number) {}
}

export class GetActivosByProyectoId {
  static readonly type = '[ActivoProyecto] Get ActivoProyecto';
  constructor(public proyectoId: number) {}
}