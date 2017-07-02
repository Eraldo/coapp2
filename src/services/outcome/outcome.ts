import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Outcome, PartialOutcome} from "../../models/outcome";
import {Status} from "../../models/status";
import {Observable} from "rxjs/Observable";
import {Scope} from "../../models/scope";
import {ApiService} from "../api/api";


@Injectable()
export class OutcomeService {
  outcomesUrl = 'outcomes/';
  _outcomes$ = new BehaviorSubject<Outcome[]>([]);

  get outcomes$() {
    return this._outcomes$.asObservable()
  }

  constructor(private apiService: ApiService) {
    console.log('Hello OutcomeService Provider');
  }

  loadOutcomes() {
    // API call
    this.getOutcomes$().subscribe(outcomes => this._outcomes$.next(outcomes))
  }

  public createOutcome$(outcome: PartialOutcome): Observable<Outcome> {
    if (outcome.description == null) {
      delete outcome.description;
    }
    return this.apiService.post$(this.outcomesUrl, outcome)
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public getOutcomes$(status?: Status, scope?: Scope): Observable<Outcome[]> {
    return this.apiService.get$(this.outcomesUrl, {status, scope})
      .map(response => response
        .map(outcome => this.mapApiOutcomeToOutcome(outcome)))
  }

  public getOutcome$(url: string): Observable<Outcome> {
    return this.apiService.get$(url)
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public updateOutcome$(url: string, changes: PartialOutcome): Observable<Outcome> {
    changes = this.mapOutcomeToApiOutcome(changes);
    return this.apiService.patch$(url, changes)
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public deleteOutcome$(url: string) {
    return this.apiService.delete$(url)
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
      isFocus: object.is_focus,
      //   createdAt?: string;
    });
    return outcome;
  }

  private mapOutcomeToApiOutcome(object: PartialOutcome): Object {
    if (object.hasOwnProperty('start')) {
      object['date'] = object.start;
      delete object.start;
    }
    if (object.hasOwnProperty('isFocus')) {
      delete object.isFocus;
    }
    return object;
  }
}
