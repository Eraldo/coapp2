import {Injectable} from '@angular/core';

import {Outcome, PartialOutcome} from "../../models/outcome";
import {Status} from "../../models/status";
import {Observable} from "rxjs/Observable";
import {Scope} from "../../models/scope";
import {ApiService} from "../api/api";

@Injectable()
export class OutcomeDataService {
  outcomesUrl = 'outcomes/';

  constructor(private apiService: ApiService) {
    console.log('Hello OutcomeDataService Provider');
  }

  public createOutcome$(outcome: PartialOutcome): Observable<Outcome> {
    outcome = Object.assign({}, outcome);
    if (outcome.description == null) {
      delete outcome.description;
    }
    outcome = this.mapOutcomeToApiOutcome(outcome);
    return this.apiService.post$(this.outcomesUrl, outcome)
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public getOutcomes$(status?: Status, scope?: Scope): Observable<Outcome[]> {
    return this.apiService.get$(this.outcomesUrl, {status, scope})
      .map(response => response
        .map(outcome => this.mapApiOutcomeToOutcome(outcome)))
  }

  public getOutcome$(id: string): Observable<Outcome> {
    return this.apiService.get$(id)
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public updateOutcome$(id: string, changes: PartialOutcome): Observable<Outcome> {
    changes = this.mapOutcomeToApiOutcome(changes);
    return this.apiService.patch$(id, changes)
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public deleteOutcome$(id: string) {
    return this.apiService.delete$(id)
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
    // Making the object mutable
    object = Object.assign({}, object);

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
