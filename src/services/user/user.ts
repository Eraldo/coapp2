import {Injectable} from '@angular/core';
import {PartialUser, User} from "../../models/user";
import {Observable} from "rxjs";

import {GooglePlus} from "@ionic-native/google-plus";
import {ApiService} from "../api/api";
import {Store} from "@ngrx/store";
import {
  JoinAction, LoginAction, LogoutAction, UpdateUserAction
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

  get authenticated$(): Observable<boolean> {
    return this.store.select(fromRoot.getAuthenticated);
  }

  constructor(private apiService: ApiService, private googlePlus: GooglePlus, private store: Store<State>) {
    console.log('Hello UserService Provider');
  }

  getUserId$(): Observable<string> {
    return this.store.select(fromRoot.getCurrentUserId);
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

  join(email: string, password: string, username?: string, name?: string) {
    this.store.dispatch(new JoinAction({email, password, username, name}));
  }

  updateUser(changes: PartialUser){
    this.store.dispatch(new UpdateUserAction(changes));
  }

  getUser$(query: PartialUser): Observable<User> {
    // Todo: Refactor to searching the users from store (this.users$)
    return this.apiService.get$(this.usersKey, query)
      .map(users => users[0])
  }

  getUsersByIds$(ids: string[]): Observable<User[]> {
    return this.users$
      .map(users => users.filter(user => ids.find(id => id == user.id)));
  }

  getUserById$(id: string): Observable<User> {
    return this.users$
      .map(users => users.find(user => user.id == id));
  }

  userExists$(query: PartialUser) {
    return this.apiService.get$('users/exists/', query);
  }
}
