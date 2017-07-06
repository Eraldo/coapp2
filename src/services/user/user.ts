import {Injectable} from '@angular/core';
import {ANONYMOUS_USER, PartialUser, User} from "../../models/user";
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {GooglePlus} from "@ionic-native/google-plus";
import {ApiService} from "../api/api";

@Injectable()
export class UserService {
  usersKey = 'users/';
  userKey = 'rest-auth/user/';
  _user$ = new BehaviorSubject<User>(ANONYMOUS_USER);
  _users$ = new BehaviorSubject<User[]>([]);

  get user$() {
    return this._user$.asObservable()
  }

  get users$() {
    return this._users$.asObservable()
  }

  constructor(private apiService: ApiService, private googlePlus: GooglePlus) {
    console.log('Hello UserService Provider');

    // Getting user from token subscription.
    this.apiService.token$.subscribe(token => {
      if (token) {
        this.getCurrentUser$().subscribe(user => this._user$.next(user))
      } else {
        this._user$.next(ANONYMOUS_USER);
      }
    });
  }

  getUserId$(): Observable<string> {
    return this.user$.map(user => user.id)
  }

  logout$(): Observable<any> {
    this.apiService.setToken('');
    return this.apiService.post$('rest-auth/logout/', {});
  }

  login$(email: string, password: string): Observable<string> {
    return this.apiService.getToken$(email, password)
      .do(token => this.apiService.setToken(token));
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

  private getCurrentUser$(): Observable<User> {
    return this.apiService.get$(this.userKey)
      .map(userObject => this.mapApiUserToUser(userObject))
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
    const userObject = {
      id: object.url,
      name: object.name,
      email: object.email,
      image: object.avatar,
      duo: object.duo,
      clan: object.clan,
      tribe: object.tribe,
      createdAt: object.date_joined,
    };
    let user = User.fromObject(userObject);
    return user;
  }

  private mapUserToApiUser(object: PartialUser) {
    return object;
  }
}
