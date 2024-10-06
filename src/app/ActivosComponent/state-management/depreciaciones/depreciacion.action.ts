export class GetDepreciacion {
    static readonly type = '[Depreciacion] Get Depreciacion';
}

export class AddDepreciacion {
    static readonly type = '[Depreciacion] Add Depreciacion';
    constructor(public payload: any) {}
}

export class UpdateDepreciacion {
  static readonly type = '[Depreciacion] Update Depreciacion';
  constructor(public payload: any) {}
}

export class DeleteDepreciacion {
  static readonly type = '[Depreciacion] Delete Depreciacion';
  constructor(public id: number) {}
}