export class GetDireccion {
    static readonly type = '[Direccion] Get Direccion';
}

export class AddDireccion {
    static readonly type = '[Direccion] Add Direccion';
    constructor(public payload: any) {}
}

export class UpdateDireccion {
  static readonly type = '[Direccion] Update Direccion';
  constructor(public payload: any) {}
}

export class DeleteDireccion {
  static readonly type = '[Direccion] Delete Direccion';
  constructor(public id: number) {}
}