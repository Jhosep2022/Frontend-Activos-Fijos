export class GetCustodio {
    static readonly type = '[Custodio] Get Custodio';
}

export class AddCustodio {
    static readonly type = '[Custodio] Add Custodio';
    constructor(public payload: any) {}
}

export class UpdateCustodio {
  static readonly type = '[Custodio] Update Custodio';
  constructor(public payload: any) {}
}

export class DeleteCustodio {
  static readonly type = '[Custodio] Delete Custodio';
  constructor(public id: number) {}
}