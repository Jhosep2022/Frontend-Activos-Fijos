export class GetDepartamento {
    static readonly type = '[Departamento] Get Departamento';
}

export class AddDepartamento {
    static readonly type = '[Departamento] Add Departamento';
    constructor(public payload: any) {}
}

export class UpdateDepartamento {
  static readonly type = '[Departamento] Update Departamento';
  constructor(public payload: any) {}
}

export class DeleteDepartamento {
  static readonly type = '[Departamento] Delete Departamento';
  constructor(public id: number) {}
}