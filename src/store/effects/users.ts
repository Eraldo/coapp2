import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import {UserService} from "../../services/user/user";
import {
  LOAD_TOKEN, LoadTokenSuccessAction, LoadTokenFailAction,
  LOAD_TOKEN_SUCCESS,
  LOAD_USER, LoadUserSuccessAction, LoadUserFailAction,
  LOAD_USERS, LoadUsersAction, LoadUsersSuccessAction, LoadUsersFailAction,
  LOGIN, LoginSuccessAction, LoginFailAction, LoginCredentials,
  LOGIN_SUCCESS,
  LOGOUT, LogoutSuccessAction, LogoutFailAction,
  LOGOUT_SUCCESS,
  JOIN, JoinCredentials, LoginAction, JoinFailAction,
  UPDATE_USER, UpdateUserSuccessAction, UpdateUserFailAction,
  UPDATE_USER_SUCCESS,

} from "../actions/users";
import {ApiService} from "../../services/api/api";
import {NavService} from "../../services/nav/nav";
import {App, NavController} from "ionic-angular";
import {UserDataService} from "../../services/user/user-data";

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private storage: Storage, private apiService: ApiService, private userService: UserService, private userDataService: UserDataService, protected app: App) {
  }

  get navCtrl(): NavController {
    return this.app.getRootNav();
  }

  @Effect()
  loadToken$: Observable<Action> = this.actions$
    .ofType(LOAD_TOKEN)
    .switchMap(() =>
      this.apiService.token$
        .map(token => new LoadTokenSuccessAction(token))
        .catch(error => Observable.of(new LoadTokenFailAction(error)))
    );

  @Effect()
  loadTokenSuccess$: Observable<Action> = this.actions$
    .ofType(LOAD_TOKEN_SUCCESS)
    .map(toPayload)
    .do(token => localStorage.setItem('token', token))
    .do(token => this.storage.set('token', token))
    .switchMap(token => this.userDataService.getCurrentUser$()
      .map(user => new LoginSuccessAction(user))
      .catch(error => Observable.of(new LoginFailAction(error)))
    );

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(LOAD_USERS, LOGIN_SUCCESS)
    .switchMap(() =>
      this.userDataService.getUsers$()
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
    .map(token => new LoadTokenSuccessAction(token))
    .catch(error => Observable.of(new LoginFailAction(error))
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
    .switchMap(() => this.apiService.post$('rest-auth/logout/', {}))
    .map(() => new LogoutSuccessAction())
    .catch(error => Observable.of(new LogoutFailAction(error))
    );

  @Effect({dispatch: false})
  logoutSuccess$: Observable<Action> = this.actions$
    .ofType(LOGOUT_SUCCESS)
    .map(toPayload)
    .do(token => localStorage.setItem('token', ''))
    .do(() => this.storage.set('token', ''))
    .do(() => this.navCtrl.setRoot('WelcomePage'));

  @Effect()
  join$: Observable<Action> = this.actions$
    .ofType(JOIN)
    .map(toPayload)
    .switchMap((credentials: JoinCredentials) => {
      const email = credentials.email;
      const username = credentials.username || credentials.email.split('@')[0];
      const password = credentials.password;
      const name = credentials.name;
      return this.apiService.post$('rest-auth/registration/', {
        email,
        username,
        password1: password,
        password2: password,
        name
      })
        .map(user => new LoginAction(credentials))
    })
    .catch(error => Observable.of(new JoinFailAction(error))
    );

  @Effect()
  updateUser$: Observable<Action> = this.actions$
    .ofType(UPDATE_USER)
    .map(toPayload)
    .switchMap(changes =>
      this.userDataService.updateUser$(changes)
        .map(user => new UpdateUserSuccessAction(user))
        .catch(error => Observable.of(new UpdateUserFailAction(error)))
    )
    .catch(error => Observable.of(new JoinFailAction(error))
    );

  @Effect()
  updateUserSuccess$: Observable<Action> = this.actions$
    .ofType(UPDATE_USER_SUCCESS)
    .map(toPayload)
    .map(user => new LoadUserSuccessAction(user));

}
