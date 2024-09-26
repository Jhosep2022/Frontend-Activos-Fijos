export class GetEmpresa {
    static readonly type = '[Empresa] Get Empresa';
}

export class AddEmpresa {
    static readonly type = '[Empresa] Add Empresa';
    constructor(public payload: any) {}
}

export class UpdateEmpresa {
  static readonly type = '[Empresa] Update Empresa';
  constructor(public payload: any) {}
}

export class DeleteEmpresa {
  static readonly type = '[Empresa] Delete Empresa';
  constructor(public id: number) {}
}