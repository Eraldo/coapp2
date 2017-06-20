import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Outcome} from "../../models/outcome";
import {Status} from "../../models/status";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user";

@Injectable()
export class OutcomeService {
  apiUrl = 'http://127.0.0.1:8004/api/';
  outcomesUrl = this.apiUrl + 'outcomes/';
  _outcomes$ = new BehaviorSubject<Outcome[]>([]);

  get outcomes$() {
    return this._outcomes$.asObservable()
  }

  constructor(private userService: UserService, public http: Http) {
    console.log('Hello OutcomeService Provider');
  }

  loadOutcomes() {
    // API call
    this.getOutcomes$().subscribe(outcomes => this._outcomes$.next(outcomes))
  }

  public getOutcomes$(): Observable<Outcome[]> {
    return this.http.get(this.outcomesUrl, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      // Showing paginated results object.
      .map(response => response
      // Converting api objects to Outcomes.
        .map(outcome => this.mapApiOutcomeToOutcome(outcome)))
  }

  public getOutcome$(url: string): Observable<Outcome> {
    return this.http.get(url, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  private mapApiOutcomeToOutcome(object): Outcome {
    let status = undefined;
    switch (object.status) {
      case 1:
        status = Status.OPEN;
        break;
      case 2:
        status = Status.WAITING;
        break;
      case 3:
        status = Status.DONE;
        break;
      case 4:
        status = Status.CANCELED;
        break;
    }

    const outcome = {
      id: object.id,
      userId: object.owner,
      name: object.name,
      inbox: object.inbox,
      status: status,
      scope: object.scope,
      deadline: object.deadline,
      start: object.date,
      description: object.description,
      // steps?: Step[],
      //   createdAt?: string;
      //
    };
    return outcome;
    // return Outcome.fromObject(object);
  }

}
