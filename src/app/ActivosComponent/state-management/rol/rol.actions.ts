export class GetRols {
    static readonly type = '[Rol] Get Rols';
}

export class AddRol {
    static readonly type = '[Rol] Add Rol';
    constructor(public payload: any) {}
}

export class UpdateRol {
  static readonly type = '[Rol] Update Rol';
  constructor(public payload: any) {}
}

export class DeleteRol {
  static readonly type = '[Rol] Delete Rol';
  constructor(public id: number) {}
}