export class GetProvincia {
    static readonly type = '[Provincia] Get Provincia';
}

export class AddProvincia {
    static readonly type = '[Provincia] Add Provincia';
    constructor(public payload: any) {}
}

export class UpdateProvincia {
  static readonly type = '[Provincia] Update Provincia';
  constructor(public payload: any) {}
}

export class DeleteProvincia {
  static readonly type = '[Provincia] Delete Provincia';
  constructor(public id: number) {}
}