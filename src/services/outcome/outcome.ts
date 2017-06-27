import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Outcome, OutcomeObject, PartialOutcome} from "../../models/outcome";
import {Status} from "../../models/status";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user";
import {Scope} from "../../models/scope";


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

  public createOutcome$(outcome: PartialOutcome): Observable<Outcome> {
    outcome['owner'] = this.userService._user$.value.id;
    if (outcome.description == null) {
      delete outcome.description;
    }
    return this.http.post(this.outcomesUrl, outcome, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public getOutcomes$(status?: Status, scope?: Scope): Observable<Outcome[]> {
    let options = this.userService.getApiOptions();
    if (status) {
      options.params.set('status', status.toString());
    }
    if (scope) {
      options.params.set('scope', scope.toString());
    }
    return this.http.get(this.outcomesUrl, options)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
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

  public updateOutcome$(url: string, changes: PartialOutcome) {
    changes = this.mapOutcomeToApiOutcome(changes);
    return this.http.patch(url, changes, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public deleteOutcome$(url: string) {
    return this.http.delete(url, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  private mapApiOutcomeToOutcome(object): Outcome {
    const outcome = new Outcome({
      id: object.url,
      owner: object.owner,
      name: object.name,
      description: object.description,
      inbox: object.inbox,
      status: object.status,
      scope: object.scope,
      start: object.date,
      deadline: object.deadline,
      //   createdAt?: string;
    });
    return outcome;
  }

  private mapOutcomeToApiOutcome(object: PartialOutcome): Object {
    if (object.hasOwnProperty('start')) {
      object['date'] = object.start;
      delete object.start;
    }
    return object;
  }
}
