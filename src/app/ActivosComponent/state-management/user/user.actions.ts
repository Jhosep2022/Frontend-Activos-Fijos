export class GetUsers {
    static readonly type = '[User] Get Users';
}

export class AddUser {
    static readonly type = '[User] Add User';
    constructor(public payload: any) {}
}

export class UpdateUser {
  static readonly type = '[User] Update User';
  constructor(public payload: any) {}
}

export class DeleteUser {
  static readonly type = '[User] Delete User';
  constructor(public id: number) {}
}