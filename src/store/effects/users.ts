import {Injectable, ViewChild} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {UserService} from "../../services/user/user";
import {
  LOAD_USER, LOAD_USERS, LoadUserFailAction, LoadUsersAction, LoadUsersFailAction, LoadUsersSuccessAction,
  LoadUserSuccessAction, LOGIN, LOGIN_SUCCESS, LoginCredentials, LoginSuccessAction, LOGOUT, LOGOUT_SUCCESS,
  LogoutFailAction,
  LogoutSuccessAction
} from "../actions/users";
import {ApiService} from "../../services/api/api";
import {NavService} from "../../services/nav/nav";
import {App, NavController} from "ionic-angular";

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private userService: UserService, protected app: App) {
  }

  get navCtrl(): NavController {
    return this.app.getRootNav();
  }

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(LOAD_USERS)
    .switchMap(() =>
      this.userService.getUsers$()
        .map(users => new LoadUsersSuccessAction(users))
        .catch(error => Observable.of(new LoadUsersFailAction(error)))
    );

  @Effect()
  loadUser$: Observable<Action> = this.actions$
    .ofType(LOAD_USER)
    .map(toPayload)
    .switchMap(id =>
      this.userService.getUserById$(id)
        .map(user => new LoadUserSuccessAction(user))
        .catch(error => Observable.of(new LoadUserFailAction(error)))
    );

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(LOGIN)
    .map(toPayload)
    .switchMap((credentials: LoginCredentials) =>
      this.apiService.getToken$(credentials.email, credentials.password))
    // TODO: Refactoring to token action?
    .do(token => this.apiService.setToken(token))
    .switchMap(token => this.userService.getCurrentUser$())
    .map(user => new LoginSuccessAction(user))
    .catch(error => Observable.of(new LoadUserFailAction(error))
    );

  @Effect({dispatch: false})
  loginSuccess$: Observable<Action> = this.actions$
    .ofType(LOGIN_SUCCESS)
    .map(toPayload)
    .do(user => this.navCtrl.setRoot('HomePage'));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(LOGOUT)
    .map(toPayload)
    .switchMap(() => {
      this.apiService.setToken('');
      return this.apiService.post$('rest-auth/logout/', {})
    })
    .map(() => new LogoutSuccessAction())
    .catch(error => Observable.of(new LogoutFailAction(error))
    );

  @Effect({dispatch: false})
  logoutSuccess$: Observable<Action> = this.actions$
    .ofType(LOGOUT_SUCCESS)
    .map(toPayload)
    .do(user => this.navCtrl.setRoot('WelcomePage'))
}
