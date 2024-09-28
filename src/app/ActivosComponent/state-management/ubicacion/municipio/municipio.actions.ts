export class GetMunicipio {
    static readonly type = '[Municipio] Get Municipio';
}

export class AddMunicipio {
    static readonly type = '[Municipio] Add Municipio';
    constructor(public payload: any) {}
}

export class UpdateMunicipio {
  static readonly type = '[Municipio] Update Municipio';
  constructor(public payload: any) {}
}

export class DeleteMunicipio {
  static readonly type = '[Municipio] Delete Municipio';
  constructor(public id: number) {}
}