export class GetPais {
    static readonly type = '[Pais] Get Pais';
}

export class AddPais {
    static readonly type = '[Pais] Add Pais';
    constructor(public payload: any) {}
}

export class UpdatePais {
  static readonly type = '[Pais] Update Pais';
  constructor(public payload: any) {}
}

export class DeletePais {
  static readonly type = '[Pais] Delete Pais';
  constructor(public id: number) {}
}