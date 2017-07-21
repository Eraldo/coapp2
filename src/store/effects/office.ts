import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {
  ADD_OUTCOME, AddOutcomeFailAction, AddOutcomeSuccessAction,
  LOAD_OUTCOME, LoadOutcomeSuccessAction, LoadOutcomeFailAction,
  LOAD_OUTCOMES, LoadOutcomesSuccessAction, LoadOutcomesFailAction,
  UPDATE_OUTCOME, UpdateOutcomeSuccessAction, UpdateOutcomeFailAction, UpdateOutcomeActionPayload,
  DELETE_OUTCOME, DeleteOutcomeSuccessAction, DeleteOutcomeFailAction, DELETE_OUTCOME_SUCCESS,
} from "../actions/office";
import {OutcomeDataService} from "../../services/outcome/outcome-data";

@Injectable()
export class OfficeEffects {

  constructor(private actions$: Actions, private outcomeDataService: OutcomeDataService) {
  }

  @Effect()
  loadOutcomes$: Observable<Action> = this.actions$
    .ofType(LOAD_OUTCOMES)
    .switchMap(() =>
      this.outcomeDataService.getOutcomes$()
        .map((outcomes) => new LoadOutcomesSuccessAction(outcomes))
        .catch(error => Observable.of(new LoadOutcomesFailAction(error)))
    );

  @Effect()
  loadOutcome$: Observable<Action> = this.actions$
    .ofType(LOAD_OUTCOME)
    .map(toPayload)
    .switchMap(id =>
      this.outcomeDataService.getOutcome$(id)
        .map(outcome => new LoadOutcomeSuccessAction(outcome))
        .catch(error => Observable.of(new LoadOutcomeFailAction(error)))
    );

  @Effect()
  addOutcome$: Observable<Action> = this.actions$
    .ofType(ADD_OUTCOME)
    .map(toPayload)
    .switchMap(outcome =>
      this.outcomeDataService.createOutcome$(outcome)
        .map(outcome => new AddOutcomeSuccessAction(outcome))
        .catch(error => Observable.of(new AddOutcomeFailAction(error)))
    );

  @Effect()
  updateOutcome$: Observable<Action> = this.actions$
    .ofType(UPDATE_OUTCOME)
    .map(toPayload)
    .switchMap((payload: UpdateOutcomeActionPayload) =>
      this.outcomeDataService.updateOutcome$(payload.id, payload.changes)
        .map(outcome => new UpdateOutcomeSuccessAction(outcome))
        .catch(error => Observable.of(new UpdateOutcomeFailAction(error)))
    );

  @Effect()
  deleteOutcome$: Observable<Action> = this.actions$
    .ofType(DELETE_OUTCOME)
    .map(toPayload)
    .switchMap(id =>
      this.outcomeDataService.deleteOutcome$(id)
        .map(() => new DeleteOutcomeSuccessAction(id))
        .catch(error => Observable.of(new DeleteOutcomeFailAction(error)))
    );
}
