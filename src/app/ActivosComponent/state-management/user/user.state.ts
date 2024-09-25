import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddUser, GetUsers } from './user.actions';
import { UserServiceService } from '../../services/user-service.service';
import { UserModel } from '../../models/user.model';

export interface UserStateModel {
  users: UserModel[];
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
  }
})
@Injectable()
export class UserState {
  constructor(private userService: UserServiceService) {}

  // Selector para obtener usuarios del estado
  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  // Acción para obtener los usuarios
  @Action(GetUsers)
  getUsers({ patchState }: StateContext<UserStateModel>) {
    return this.userService.getAllUsers().pipe(
      tap((response) => {
        patchState({ users: response.data });
      })
    );
  }
  
  // Acción para agregar usuario
  @Action(AddUser)
  addUser({ getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
    return this.userService.addUser(payload).pipe(
      tap((user) => {
        const state = getState();
        patchState({
          users: [...state.users, user],
        });
      })
    );
  }
}
