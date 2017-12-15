import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {Http, Headers, RequestOptions} from "@angular/http";
import {ConfigService} from "../config/config";

import {Store} from "@ngrx/store";
import {State} from "../../store/reducers/index";
import * as fromRoot from '../../store/reducers';
import {LoadTokenSuccessAction} from "../../store/actions/users";

@Injectable()
export class ApiService {
  private apiUrl;

  get token$() {
    return this.store.select(fromRoot.getToken);
  }

  constructor(private configService: ConfigService, public http: Http, private store: Store<State>) {
    console.log('Hello ApiService Provider');

    this.configService.data$
      .subscribe(data => this.apiUrl = data.api);

    // Getting token from storage.
    // storage.get('token').then((token) => {
    //   if (token) {
    //     this.store.dispatch(new LoadTokenSuccessAction(token));
    //   }
    // });
  }

  setToken(token: string) {
    this.store.dispatch(new LoadTokenSuccessAction(token));
  }

  getToken$(email: string, password: string) {
    return this.http.post(this.apiUrl + 'rest-auth/login/', {email, password}, this.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'))
      .map(response => response.key)
  }

  getApiOptions(params?: Object, token?: string) {
    this.token$.take(1).subscribe(t => token = token || t);

    let headers = new Headers({'Content-Type': 'application/json'});
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
    if (!key) {
      return Observable.throw('No url resource key provided.')
    }
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
