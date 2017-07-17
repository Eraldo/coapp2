import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {DuoService} from "../../services/duo/duo";
import {
  LOAD_DUO, LOAD_DUOS, LoadDuoFailAction, LoadDuosFailAction, LoadDuosSuccessAction,
  LoadDuoSuccessAction
} from "../actions/community";

@Injectable()
export class CommunityEffects {

  constructor(private actions$: Actions, private duoService: DuoService) {
  }

  @Effect()
  loadDuos$: Observable<Action> = this.actions$
    .ofType(LOAD_DUOS)
    .switchMap(() =>
      this.duoService.getDuos$()
        .map((duos) => new LoadDuosSuccessAction(duos))
        .catch(error => Observable.of(new LoadDuosFailAction(error)))
    );

  @Effect()
  loadDuo$: Observable<Action> = this.actions$
    .ofType(LOAD_DUO)
    .map(toPayload)
    .switchMap(id =>
      this.duoService.getDuo$(id)
        .map(duo => new LoadDuoSuccessAction(duo))
        .catch(error => Observable.of(new LoadDuoFailAction(error)))
    );
}
