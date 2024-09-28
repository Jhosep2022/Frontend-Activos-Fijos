export class GetBloque {
    static readonly type = '[Bloque] Get Bloque';
}

export class AddBloque {
    static readonly type = '[Bloque] Add Bloque';
    constructor(public payload: any) {}
}

export class UpdateBloque {
  static readonly type = '[Bloque] Update Bloque';
  constructor(public payload: any) {}
}

export class DeleteBloque {
  static readonly type = '[Bloque] Delete Bloque';
  constructor(public id: number) {}
}