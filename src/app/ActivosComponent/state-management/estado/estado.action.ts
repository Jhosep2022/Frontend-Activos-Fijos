export class GetEstado {
    static readonly type = '[Estado] Get Estado';
}

export class AddEstado {
    static readonly type = '[Estado] Add Estado';
    constructor(public payload: any) {}
}

export class UpdateEstado {
  static readonly type = '[Estado] Update Estado';
  constructor(public payload: any) {}
}

export class DeleteEstado {
  static readonly type = '[Estado] Delete Estado';
  constructor(public id: number) {}
}