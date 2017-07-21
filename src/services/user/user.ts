import {Injectable} from '@angular/core';
import {ANONYMOUS_USER, PartialUser, User} from "../../models/user";
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {GooglePlus} from "@ionic-native/google-plus";
import {ApiService} from "../api/api";
import {Store} from "@ngrx/store";
import {
  LoadUserAction, LoginAction, LoginFailAction, LoginSuccessAction,
  LogoutAction
} from "../../store/actions/users";
import {State} from "../../store/reducers/index";
import * as fromRoot from '../../store/reducers';

@Injectable()
export class UserService {
  usersKey = 'users/';
  userKey = 'rest-auth/user/';

  get user$() {
    return this.store.select(fromRoot.getCurrentUser)
  }

  get users$() {
    return this.store.select(fromRoot.getUsers)
  }

  constructor(private apiService: ApiService, private googlePlus: GooglePlus, private store: Store<State>) {
    console.log('Hello UserService Provider');

    // Getting user from token subscription.
    this.apiService.token$.subscribe(token => {
      if (token) {
        this.getCurrentUser$().subscribe(user =>
          this.store.dispatch(new LoginSuccessAction(user))
        )
      } else {
        this.store.dispatch(new LoginFailAction('No valid token.'))
        // this._user$.next(ANONYMOUS_USER);
      }
    });
  }

  public loadUser$() {
    // return this.getCurrentUser$().switchMap(user => {
    //   this._user$.next(user);
    //   return this.user$;
    // })
  }

  getUserId$(): Observable<string> {
    return this.user$.map(user => user.id)
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }

  login(email: string, password: string) {
    this.store.dispatch(new LoginAction({email, password}));
  }

  loginWithGoogle() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  get authenticated$(): Observable<boolean> {
    return this.apiService.token$.map(token => !!token)
  }

  join$(email: string, password: string, username?: string): Observable<any> {
    username = username || email.split('@')[0];
    return this.apiService.post$('rest-auth/registration/', {email, username, password1: password, password2: password})
  }

  getCurrentUser$(): Observable<User> {
    return this.apiService.get$(this.userKey)
      .map(userObject => this.mapApiUserToUser(userObject))
      .catch(error => Observable.of(ANONYMOUS_USER))
  }

  updateUser$(changes: PartialUser): Observable<User> {
    changes = this.mapUserToApiUser(changes);
    return this.apiService.patch$(this.userKey, changes)
      .map(user => this.mapApiUserToUser(user));
  }

  getUser$(query: PartialUser): Observable<User> {
    return this.apiService.get$(this.usersKey, query)
      .map(users => users[0])
  }

  getUsers$(): Observable<User[]> {
    return this.apiService.get$(this.usersKey)
      .map(users => users
        .map(user => this.mapApiUserToUser(user))
      );
  }

  getUsersByIds$(ids: string[]): Observable<User[]> {
    return this.getUsers$()
      .map(users => users
        .filter(user => ids.indexOf(user.id) > -1)
      )
  }

  getUserById$(id: string): Observable<User> {
    return this.apiService.get$(id)
      .map(user => this.mapApiUserToUser(user))
  }

  userExists$(query: PartialUser) {
    return this.apiService.get$('users/exists/', query);
  }

  private mapApiUserToUser(object): User {
    const user = new User({
      id: object.url,
      name: object.name,
      email: object.email,
      image: object.avatar,
      duo: object.duo || '',
      clan: object.clan || '',
      tribe: object.tribe || '',
      createdAt: object.date_joined,
    });
    return user;
  }

  private mapUserToApiUser(object: PartialUser) {
    return object;
  }
}
