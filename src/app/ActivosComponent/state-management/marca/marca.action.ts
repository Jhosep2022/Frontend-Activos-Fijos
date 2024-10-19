export class GetMarca {
    static readonly type = '[Marca] Get Marca';
}

export class AddMarca {
    static readonly type = '[Marca] Add Marca';
    constructor(public payload: any) {}
}

export class UpdateMarca {
  static readonly type = '[Marca] Update Marca';
  constructor(public payload: any) {}
}

export class DeleteMarca {
  static readonly type = '[Marca] Delete Marca';
  constructor(public id: number) {}
}