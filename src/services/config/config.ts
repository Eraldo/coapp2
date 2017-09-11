import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";


interface ConfigData {
  name: string;
  api: string;
}

const defaultConfig = {
  'name': 'development',
  'api': 'http://127.0.0.1:8004/api/'
};

@Injectable()
export class ConfigService {
  private _data$ = new BehaviorSubject<ConfigData>(defaultConfig);

  get data$() {
    return this._data$.asObservable()
  }

  public get(name: string) {
    return this._data$.value[name];
  }

  constructor(public http: Http) {
    console.log('Hello ConfigService Provider');

    this._data$.next(environment);

    // http.get('./assets/config/env.json')
    //   .map(response => response.json())
    //   .catch((error: any) => Observable.throw(error || 'No env.json found'))
    //   .subscribe(data => this._data$.next(data))
  }

}
