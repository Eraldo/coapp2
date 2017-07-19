import {Injectable} from '@angular/core';

import {Outcome, PartialOutcome} from "../../models/outcome";
import {Status} from "../../models/status";
import {Observable} from "rxjs/Observable";
import {Scope} from "../../models/scope";
import {ApiService} from "../api/api";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {
  AddOutcomeAction, DeleteOutcomeAction, LoadOutcomesAction,
  UpdateOutcomeAction
} from "../../store/actions/office";

@Injectable()
export class OutcomeService {
  outcomesUrl = 'outcomes/';

  get outcomes$() {
    return this.store.select(fromRoot.getOutcomes);
  }

  get scopedOutcomes$() {
    return this.store.select(fromRoot.getScopedOutcomes);
  }

  getOutcome$(query: PartialOutcome) {
    return this.outcomes$.map(outcomes => {
      return outcomes.find(outcome => Object.keys(query).every(key => outcome[key] == query[key]));
    });
  }

  addOutcome(outcome: PartialOutcome) {
    this.store.dispatch(new AddOutcomeAction(outcome));
  }

  deleteOutcome(id: string) {
    this.store.dispatch(new DeleteOutcomeAction(id));
  }

  updateOutcome(id: string, changes: PartialOutcome) {
    this.store.dispatch(new UpdateOutcomeAction({id, changes}));
  }

  constructor(private apiService: ApiService, private store: Store<fromRoot.State>) {
    console.log('Hello OutcomeService Provider');
  }

  public loadOutcomes() {
    this.store.dispatch(new LoadOutcomesAction());
  }

  public createOutcome$(outcome: PartialOutcome): Observable<Outcome> {
    if (outcome.description == null) {
      delete outcome.description;
    }
    return this.apiService.post$(this.outcomesUrl, outcome)
      .map(outcome => this.mapApiOutcomeToOutcome(outcome))
  }

  public loadOutcomes$(status?: Status, scope?: Scope): Observable<Outcome[]> {
    return this.apiService.get$(this.outcomesUrl, {status, scope})
      .map(response => response
        .map(outcome => this.mapApiOutcomeToOutcome(outcome)))
  }

  public loadOutcome$(id: string): Observable<Outcome> {
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
