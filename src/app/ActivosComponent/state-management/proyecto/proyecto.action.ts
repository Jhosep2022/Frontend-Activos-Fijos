export class GetProyecto {
    static readonly type = '[Proyecto] Get Proyecto';
}

export class AddProyecto {
    static readonly type = '[Proyecto] Add Proyecto';
    constructor(public payload: any) {}
}

export class UpdateProyecto {
  static readonly type = '[Proyecto] Update Proyecto';
  constructor(public payload: any) {}
}

export class DeleteProyecto {
  static readonly type = '[Proyecto] Delete Proyecto';
  constructor(public id: number) {}
}