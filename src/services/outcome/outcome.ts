import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Outcome} from "../../models/outcome";
import {Status} from "../../models/status";

@Injectable()
export class OutcomeService {
  _outcomes$ = new BehaviorSubject<Outcome[]>([]);

  get outcomes$() {
    return this._outcomes$.asObservable()
  }

  constructor() {
    console.log('Hello OutcomeService Provider');

    // Mock
    this._outcomes$.next([
      {
        id: '1234',
        userId: '1234',
        name: 'Tidy Garage',
        inbox: true,
        status: Status.OPEN,
        // scope? : Scope.DAY,
        // deadline? : Date,
        // start? : Date,
        // description? : string,
        // steps?: Step[],
        // createdAt? : Date,
      }
    ])
  }
}
