import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {LOGIN_SUCCESS} from "../actions/users";
import {
  ADD_OUTCOME, AddOutcomeFailAction, AddOutcomeSuccessAction,
  LOAD_OUTCOME, LoadOutcomeSuccessAction, LoadOutcomeFailAction,
  LOAD_OUTCOMES, LoadOutcomesSuccessAction, LoadOutcomesFailAction,
  UPDATE_OUTCOME, UpdateOutcomeSuccessAction, UpdateOutcomeFailAction, UpdateOutcomeActionPayload,
  DELETE_OUTCOME, DeleteOutcomeSuccessAction, DeleteOutcomeFailAction,
  LOAD_FOCUSES, LoadFocusesSuccessAction, LoadFocusesFailAction,
  LOAD_FOCUS, LoadFocusesuccessAction, LoadFocusFailAction,
  ADD_FOCUS, AddFocusSuccessAction, AddFocusFailAction, UPDATE_FOCUS, UpdateFocusActionPayload,
  UpdateFocusSuccessAction, UpdateFocusFailAction, DELETE_FOCUS, DeleteFocusSuccessAction, DeleteFocusFailAction,
} from "../actions/office";
import {OutcomeDataService} from "../../services/outcome/outcome-data";
import {FocusDataService} from "../../services/focus/focus-data";
import {ScopeService} from "../../services/scope/scope";

@Injectable()
export class OfficeEffects {

  constructor(private actions$: Actions, private outcomeDataService: OutcomeDataService, private focusDataService: FocusDataService, private scopeService: ScopeService) {
  }

  @Effect()
  loadOutcomes$: Observable<Action> = this.actions$
    .ofType(LOAD_OUTCOMES, LOGIN_SUCCESS)
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


  @Effect()
  loadFocuses$: Observable<Action> = this.actions$
    .ofType(LOAD_FOCUSES, LOGIN_SUCCESS)
    .switchMap(() =>
      this.focusDataService.getFocuses$()
        .map((focuses) => new LoadFocusesSuccessAction(focuses))
        .catch(error => Observable.of(new LoadFocusesFailAction(error)))
    );

  // @Effect()
  // loadFocus$: Observable<Action> = this.actions$
  //   .ofType(LOAD_FOCUS)
  //   .map(toPayload)
  //   .switchMap(id =>
  //     this.focusDataService.getFocus$(scope, start)
  //       .map(focus => new LoadFocusesuccessAction(focus))
  //       .catch(error => Observable.of(new LoadFocusFailAction(error)))
  //   );

  @Effect()
  addFocus$: Observable<Action> = this.actions$
    .ofType(ADD_FOCUS)
    .map(toPayload)
    .switchMap(focus =>
      this.focusDataService.createFocus$(focus)
        .map(focus => new AddFocusSuccessAction(focus))
        .catch(error => Observable.of(new AddFocusFailAction(error)))
    );

  @Effect()
  updateFocus$: Observable<Action> = this.actions$
    .ofType(UPDATE_FOCUS)
    .map(toPayload)
    .switchMap((payload: UpdateFocusActionPayload) =>
      this.focusDataService.updateFocus$(payload.id, payload.changes)
        .map(focus => new UpdateFocusSuccessAction(focus))
        .catch(error => Observable.of(new UpdateFocusFailAction(error)))
    );

  @Effect()
  deleteFocus$: Observable<Action> = this.actions$
    .ofType(DELETE_FOCUS)
    .map(toPayload)
    .switchMap(id =>
      this.focusDataService.deleteFocus$(id)
        .map(() => new DeleteFocusSuccessAction(id))
        .catch(error => Observable.of(new DeleteFocusFailAction(error)))
    );
}
