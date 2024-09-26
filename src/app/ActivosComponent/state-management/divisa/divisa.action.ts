export class GetCurrency {
    static readonly type = '[Currency] Get Currency';
}

export class AddCurrency {
    static readonly type = '[Currency] Add Currency';
    constructor(public payload: any) {}
}

export class UpdateCurrency {
  static readonly type = '[Currency] Update Currency';
  constructor(public payload: any) {}
}

export class DeleteCurrency {
  static readonly type = '[Currency] Delete Currency';
  constructor(public id: number) {}
}