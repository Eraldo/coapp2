import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Scope, SCOPES} from "../../models/scope";

@Injectable()
export class ScopeService {
  _scope$: BehaviorSubject<Scope> = new BehaviorSubject<Scope>(Scope.DAY);

  get scope$() {
    return this._scope$.asObservable()
  }

  get scopes$() {
    return Observable.of(SCOPES)
  }

  constructor() {
    console.log('Hello ScopeService Provider');
  }

  setScope(scope: Scope): Promise<Scope> {
    this._scope$.next(scope);
    return new Promise((resolve, reject) => {
      resolve(scope);
    });
  }
}
