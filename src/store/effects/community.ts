import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {DuoDataService} from "../../services/duo/duo-data";
import {
  LOAD_DUO, LoadDuoSuccessAction, LoadDuoFailAction,
  LOAD_DUOS, LoadDuosSuccessAction, LoadDuosFailAction,
  ADD_DUO, AddDuoFailAction, AddDuoSuccessAction,
  UPDATE_DUO, UpdateDuoSuccessAction, UpdateDuoFailAction, UpdateDuoActionPayload,
  DELETE_DUO, DeleteDuoSuccessAction, DeleteDuoFailAction,
  JOIN_DUO, JoinDuoSuccessAction, JoinDuoFailAction,
  QUIT_DUO, QuitDuoSuccessAction, QuitDuoFailAction
} from "../actions/community";
import {DuoService} from "../../services/duo/duo";
import {LoadUserSuccessAction} from "../actions/users";
import {UserDataService} from "../../services/user/user-data";

@Injectable()
export class CommunityEffects {

  constructor(private actions$: Actions, private duoDataService: DuoDataService, private duoService: DuoService, private userDataService: UserDataService) {
  }

  @Effect()
  loadDuos$: Observable<Action> = this.actions$
    .ofType(LOAD_DUOS)
    .switchMap(() =>
      this.duoDataService.getDuos$()
        .map((duos) => new LoadDuosSuccessAction(duos))
        .catch(error => Observable.of(new LoadDuosFailAction(error)))
    );

  @Effect()
  loadDuo$: Observable<Action> = this.actions$
    .ofType(LOAD_DUO)
    .map(toPayload)
    .switchMap(id =>
      this.duoDataService.getDuo$(id)
        .map(duo => new LoadDuoSuccessAction(duo))
        .catch(error => Observable.of(new LoadDuoFailAction(error)))
    );


  @Effect()
  addDuo$: Observable<Action> = this.actions$
    .ofType(ADD_DUO)
    .map(toPayload)
    .switchMap(duo =>
      this.duoDataService.createDuo$(duo)
        .map(duo => new AddDuoSuccessAction(duo))
        .catch(error => Observable.of(new AddDuoFailAction(error)))
    );

  @Effect()
  updateDuo$: Observable<Action> = this.actions$
    .ofType(UPDATE_DUO)
    .map(toPayload)
    .switchMap((payload: UpdateDuoActionPayload) =>
      this.duoDataService.updateDuo$(payload.id, payload.changes)
        .map(duo => new UpdateDuoSuccessAction(duo))
        .catch(error => Observable.of(new UpdateDuoFailAction(error)))
    );

  @Effect()
  deleteDuo$: Observable<Action> = this.actions$
    .ofType(DELETE_DUO)
    .map(toPayload)
    .switchMap(id =>
      this.duoDataService.deleteDuo$(id)
        .map(() => new DeleteDuoSuccessAction(id))
        .catch(error => Observable.of(new DeleteDuoFailAction(error)))
    );

  @Effect()
  joinDuo$: Observable<Action> = this.actions$
    .ofType(JOIN_DUO)
    .map(toPayload)
    .switchMap(duoId =>
      this.userDataService.updateUser$({duo: duoId})
        .mergeMap(user => [
          new JoinDuoSuccessAction({userId: user.id, duoId}),
          new LoadUserSuccessAction(user)
        ])
        .catch(error => Observable.of(new JoinDuoFailAction(error)))
    );

  @Effect()
  quitDuo$: Observable<Action> = this.actions$
    .ofType(QUIT_DUO)
    .map(toPayload)
    .switchMap(() => this.duoService.duo$.take(1))
    .switchMap(duo =>
      this.userDataService.updateUser$({duo: null})
        .mergeMap(user => [
          new QuitDuoSuccessAction({userId: user.id, duoId: duo.id}),
          new LoadUserSuccessAction(user)
        ])
        .catch(error => Observable.of(new QuitDuoFailAction(error)))
    );
}
