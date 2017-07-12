import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Http, Headers, RequestOptions} from "@angular/http";
import {ConfigService} from "../config/config";

@Injectable()
export class ApiService {
  private apiUrl;
  _token$ = new BehaviorSubject<string>('');

  get token$() {
    return this._token$.asObservable()
  }

  constructor(private storage: Storage, private configService: ConfigService, public http: Http) {
    console.log('Hello ApiService Provider');

    this.configService.data$
      .subscribe(data => this.apiUrl = data.api);

    // Getting token from storage.
    storage.get('token').then((token) => {
      this._token$.next(token)
    });
  }

  setToken(token: string) {
    this.storage.set('token', token);
    this._token$.next(token);
  }

  getToken$(email: string, password: string) {
    return this.http.post(this.apiUrl + 'rest-auth/login/', {email, password}, this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'))
      .map(response => response.key)
  }

  getApiOptions(params?: Object, token?: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    token = token || this._token$.value;
    if (token) {
      headers.set('Authorization', `Token ${token}`);
    }
    let urlParams = new URLSearchParams();
    for (let param in params) {
      urlParams.set(param, params[param]);
    }
    return new RequestOptions({headers, params});
  }

  get$(key: string, params?: Object) {
    return this.http.get(this.getUrl(key), this.getApiOptions(params))
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'))
  }

  post$(key: string, data: Object) {
    return this.http.post(this.getUrl(key), data, this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'))
  }

  patch$(key: string, changes: Object) {
    return this.http.patch(this.getUrl(key), changes, this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'))
  }

  delete$(key: string) {
    return this.http.delete(this.getUrl(key), this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'))
  }

  private getUrl(key: string) {
    if (key && key.search(this.apiUrl) == -1)
      return this.apiUrl + key;
    return key
  }
}
