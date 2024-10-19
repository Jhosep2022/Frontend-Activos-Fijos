export class GetModelo {
    static readonly type = '[Modelo] Get Modelo';
}

export class AddModelo {
    static readonly type = '[Modelo] Add Modelo';
    constructor(public payload: any) {}
}

export class UpdateModelo {
  static readonly type = '[Modelo] Update Modelo';
  constructor(public payload: any) {}
}

export class DeleteModelo {
  static readonly type = '[Modelo] Delete Modelo';
  constructor(public id: number) {}
}