export class GetArea {
    static readonly type = '[Area] Get Area';
}

export class AddArea {
    static readonly type = '[Area] Add Area';
    constructor(public payload: any) {}
}

export class UpdateArea {
  static readonly type = '[Area] Update Area';
  constructor(public payload: any) {}
}

export class DeleteArea {
  static readonly type = '[Area] Delete Area';
  constructor(public id: number) {}
}