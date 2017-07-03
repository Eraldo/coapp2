import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

const defaultConfig = {
  'environment': 'development',
  'api': 'http://127.0.0.1:8004/api/',
};

@Injectable()
export class ConfigService {
  private data$ = new BehaviorSubject<{}>(defaultConfig);

  public get(name: string) {
    return this.data$.value[name];
  }

  constructor(public http: Http) {
    console.log('Hello ConfigService Provider');

    http.get('./assets/config/env.json')
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'No env.json found'))
      .subscribe(data => this.data$.next(data))
  }

}
