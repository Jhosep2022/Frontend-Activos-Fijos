export class GetHistorialActivo {
    static readonly type = '[HistorialActivo] Get HistorialActivo';
}

export class AddHistorialActivo {
    static readonly type = '[HistorialActivo] Add HistorialActivo';
    constructor(public payload: any) {}
}

export class UpdateHistorialActivo {
  static readonly type = '[HistorialActivo] Update HistorialActivo';
  constructor(public payload: any) {}
}

export class DeleteHistorialActivo {
  static readonly type = '[HistorialActivo] Delete HistorialActivo';
  constructor(public id: number) {}
}

export class GetHistorialActivoByActivoId {
  static readonly type = '[HistorialActivo] Get HistorialActivo By ActivoId';
  constructor(public activoId: number) {}
}