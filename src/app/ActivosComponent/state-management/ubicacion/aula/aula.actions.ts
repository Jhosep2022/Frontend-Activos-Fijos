export class GetAula {
    static readonly type = '[Aula] Get Aula';
}

export class AddAula {
    static readonly type = '[Aula] Add Aula';
    constructor(public payload: any) {}
}

export class UpdateAula {
  static readonly type = '[Aula] Update Aula';
  constructor(public payload: any) {}
}

export class DeleteAula {
  static readonly type = '[Aula] Delete Aula';
  constructor(public id: number) {}
}