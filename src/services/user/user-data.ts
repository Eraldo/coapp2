import {Injectable} from '@angular/core';
import {PartialUser, User} from "../../models/user";
import {Observable} from "rxjs";

import {GooglePlus} from "@ionic-native/google-plus";
import {ApiService} from "../api/api";
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers/index";
import md5 from 'crypto-md5';

@Injectable()
export class UserDataService {
  usersKey = 'users/';
  userKey = 'rest-auth/user/';

  constructor(private apiService: ApiService, private googlePlus: GooglePlus, private store: Store<State>) {
    console.log('Hello UserDataService Provider');
  }

  loginWithGoogle() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  join$(email: string, password: string, username?: string): Observable<any> {
    username = username || email.split('@')[0];
    return this.apiService.post$('rest-auth/registration/', {email, username, password1: password, password2: password})
  }

  getCurrentUser$(): Observable<User> {
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

  private getAvatar(email: string) {
    return `https://www.gravatar.com/avatar/${md5(email.toLowerCase(), 'hex')}?s=200&d=identicon`
  }

  private mapApiUserToUser(object): User {
    const user = new User({
      id: object.url,
      name: object.name,
      username: object.username,
      email: object.email,
      image: object.avatar || this.getAvatar(object.email),
      purpose: object.purpose,
      gender: object.gender,
      duo: object.duo || '',
      clan: object.clan || '',
      tribe: object.tribe || '',
      isAdmin: object.is_superuser || '',
      chapter: object.chapter || 0,
      registrationCountry: object.registration_country || '',
      createdAt: object.date_joined,
    });
    return user;
  }

  private mapUserToApiUser(object: PartialUser) {
    object = Object.assign({}, object);

    if (object.hasOwnProperty('registrationCountry')) {
      object['registration_country'] = object.registrationCountry;
      delete object.registrationCountry;
    }

    return object;
  }
}
