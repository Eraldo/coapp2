import {Injectable} from '@angular/core';
import {ANONYMOUS_USER, User} from "../../models/user";
import {Observable} from "rxjs";
import { Storage } from '@ionic/storage';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Http, Headers, RequestOptions} from "@angular/http";
import {GooglePlus} from "@ionic-native/google-plus";

@Injectable()
export class UserService {
  apiUrl = 'http://127.0.0.1:8004/api/';
  _user$ = new BehaviorSubject<User>(ANONYMOUS_USER);
  _users$ = new BehaviorSubject<User[]>([]);
  _token$ = new BehaviorSubject<string>('');

  get user$() {
    return this._user$.asObservable()
  }

  get users$() {
    return this._users$.asObservable()
  }

  get token$() {
    return this._token$.asObservable()
  }

  constructor(private storage: Storage, public http: Http, private googlePlus: GooglePlus) {
    console.log('Hello UserService Provider');

    // Getting token from storage.
    storage.get('token').then((token) => {
      this._token$.next(token)
    });

    // Getting user from token subscription.
    this._token$.subscribe(token => {
      if (token) {
        this.getUser$(token).subscribe(user => this._user$.next(user))
      } else {
        this._user$.next(ANONYMOUS_USER);
      }
    });

  }

  test$() {
    // return Observable.of(true);
    return this.getUsersByIds$(['3VkZKpXlrzVi4nVHJKalUOTMKPF2', 'icrYpwoJWfPDvpQl9CyHtKdXSy72']).take(1)
  }

  getUserId$(): Observable<string> {
    return this.user$.map(user => user.id)
  }

  updateName(name: string): Promise<void> {
    return this.updateUser(this._user$.value.id, {'name': name});
  }

  logout(): Promise<any> {
    const token = '';
    this._token$.next(token);
    this.storage.set('token', token);

    const logout$ = this.http.post(this.apiUrl + 'rest-auth/logout/', {}, this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    return logout$.toPromise()
  }

  login(email: string, password: string): Promise<any> {
    this.getToken$(email, password)
      .subscribe(token => {
        this._token$.next(token);
        this.storage.set('token', token);
      });
    return Promise.resolve();
  }

  loginWithGoogle() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  get authenticated$(): Observable<boolean> {
    return this._token$.map(token => !!token)
  }

  join(email: string, password: string): Observable<any> {

    const username = email.split('@')[0];

    const join$ = this.http.post(this.apiUrl + 'rest-auth/registration/', {email, username, password1: password, password2: password}, this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

    return join$
  }

  private getUser$(token: string): Observable<User> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.set('Authorization', `Token ${token}`);
    let options = new RequestOptions({headers});

    return this.http.get(this.apiUrl + 'rest-auth/user/', options)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .map(userObject => this.mapApiUserToUser(userObject))
  }

  private updateUser(id: string, changes: object): Promise<void> {
    // TODO: Check if user is authenticated?

    // return <Promise<any>> this.db.object(`/users/${id}`).update(changes);
    return Promise.reject('TODO: Implementing updateUser')
  }

  getUsers$(): Observable<User[]> {
    // return this.db.list(`/users`)
    //   .map(users => users
    //     .map(user => this.mapFirebaseUserToUser(user)))
    return Observable.of([])
  }

  getUsersByIds$(ids: string[]): Observable<User[]> {
    return this.getUsers$()
      .map(users => users
        .filter(user => ids.indexOf(user.id) > -1)
      )
  }

  getApiOptions() {
    let headers = new Headers({'Content-Type': 'application/json'});
    let token = this._token$.value;
    if (token) {
      headers.set('Authorization', `Token ${this._token$.value}`);
    }
    let params = new URLSearchParams();
    return new RequestOptions({headers, params});
  }

  getToken$(email: string, password: string) {
    return this.http.post(this.apiUrl + 'rest-auth/login/', {email, password}, this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .map(response => response.key)
  }

  private mapApiUserToUser(object): User {
    const userObject = {
      id: object.id,
      name: object.name,
      email: object.email,
      image: object.avatar,
      createdAt: object.date_joined,
    };
    let user = User.fromObject(userObject);
    return user;
  }

}
