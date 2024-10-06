export class GetIdentificador {
    static readonly type = '[Identificador] Get Identificador';
}

export class AddIdentificador {
    static readonly type = '[Identificador] Add Identificador';
    constructor(public payload: any) {}
}

export class UpdateIdentificador {
  static readonly type = '[Identificador] Update Identificador';
  constructor(public payload: any) {}
}

export class DeleteIdentificador {
  static readonly type = '[Identificador] Delete Identificador';
  constructor(public id: number) {}
}