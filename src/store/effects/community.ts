import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as community from '../actions/community';
import {DuoService} from "../../services/duo/duo";

@Injectable()
export class CommunityEffects {

  constructor(private actions$: Actions, private duoService: DuoService) { }

  @Effect()
  loadDuos$: Observable<Action> = this.actions$
    .ofType(community.LOAD_DUOS)
    // .startWith(new collection.LoadAction())
    .switchMap(() =>
      this.duoService.getDuos$()
        .map((duos) => new community.LoadDuosSuccessAction(duos))
        .catch(error => Observable.of(new community.LoadDuosFailAction(error)))
    );
}
