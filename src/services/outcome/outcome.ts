import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Outcome} from "../../models/outcome";
import {Status} from "../../models/status";
import * as moment from "moment";
import {Scope} from "../../models/scope";

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
        id: '1',
        userId: '1',
        name: 'App wireframes',
        inbox: false,
        status: Status.DONE,
        scope: Scope.DAY,
        description: 'Some content.',
        steps: [
          {
            id: '1',
            name: 'Doing Foo',
          },
          {
            id: '2',
            name: 'Doing Bar',
          },
        ],
        createdAt: moment().toISOString(),
      },
      {
        id: '2',
        userId: '1',
        name: 'App mockup',
        inbox: true,
        status: Status.OPEN,
        scope: Scope.DAY,
        deadline: moment().add(4, 'days').toISOString(),
        start: moment().add(1, 'days').toISOString(),
      },
      {
        id: '3',
        userId: '1',
        name: 'App launched',
        inbox: true,
        status: Status.WAITING,
        scope: Scope.DAY,
        deadline: moment().add(4, 'days').toISOString(),
        start: moment().add(1, 'days').toISOString(),
      },
      {
        id: '4',
        userId: '1',
        name: 'Power Day',
        inbox: false,
        status: Status.CANCELED,
        scope: Scope.WEEK,
      },
    ])
  }
}
