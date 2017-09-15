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

import {ClanDataService} from "../../services/clan/clan-data";
import {
  LOAD_CLAN, LoadClanSuccessAction, LoadClanFailAction,
  LOAD_CLANS, LoadClansSuccessAction, LoadClansFailAction,
  ADD_CLAN, AddClanFailAction, AddClanSuccessAction,
  UPDATE_CLAN, UpdateClanSuccessAction, UpdateClanFailAction, UpdateClanActionPayload,
  DELETE_CLAN, DeleteClanSuccessAction, DeleteClanFailAction,
  JOIN_CLAN, JoinClanSuccessAction, JoinClanFailAction,
  QUIT_CLAN, QuitClanSuccessAction, QuitClanFailAction
} from "../actions/community";
import {ClanService} from "../../services/clan/clan";

import {TribeDataService} from "../../services/tribe/tribe-data";
import {
  LOAD_TRIBE, LoadTribeSuccessAction, LoadTribeFailAction,
  LOAD_TRIBES, LoadTribesSuccessAction, LoadTribesFailAction,
  ADD_TRIBE, AddTribeFailAction, AddTribeSuccessAction,
  UPDATE_TRIBE, UpdateTribeSuccessAction, UpdateTribeFailAction, UpdateTribeActionPayload,
  DELETE_TRIBE, DeleteTribeSuccessAction, DeleteTribeFailAction,
  JOIN_TRIBE, JoinTribeSuccessAction, JoinTribeFailAction,
  QUIT_TRIBE, QuitTribeSuccessAction, QuitTribeFailAction
} from "../actions/community";
import {TribeService} from "../../services/tribe/tribe";
import {LoadUserSuccessAction} from "../actions/users";
import {UserDataService} from "../../services/user/user-data";

@Injectable()
export class CommunityEffects {

  constructor(private actions$: Actions, private duoDataService: DuoDataService, private duoService: DuoService, private clanDataService: ClanDataService, private clanService: ClanService, private tribeDataService: TribeDataService, private tribeService: TribeService, private userDataService: UserDataService) {
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


  @Effect()
  loadClans$: Observable<Action> = this.actions$
    .ofType(LOAD_CLANS)
    .switchMap(() =>
      this.clanDataService.getClans$()
        .map((clans) => new LoadClansSuccessAction(clans))
        .catch(error => Observable.of(new LoadClansFailAction(error)))
    );

  @Effect()
  loadClan$: Observable<Action> = this.actions$
    .ofType(LOAD_CLAN)
    .map(toPayload)
    .switchMap(id =>
      this.clanDataService.getClan$(id)
        .map(clan => new LoadClanSuccessAction(clan))
        .catch(error => Observable.of(new LoadClanFailAction(error)))
    );


  @Effect()
  addClan$: Observable<Action> = this.actions$
    .ofType(ADD_CLAN)
    .map(toPayload)
    .switchMap(clan =>
      this.clanDataService.createClan$(clan)
        .map(clan => new AddClanSuccessAction(clan))
        .catch(error => Observable.of(new AddClanFailAction(error)))
    );

  @Effect()
  updateClan$: Observable<Action> = this.actions$
    .ofType(UPDATE_CLAN)
    .map(toPayload)
    .switchMap((payload: UpdateClanActionPayload) =>
      this.clanDataService.updateClan$(payload.id, payload.changes)
        .map(clan => new UpdateClanSuccessAction(clan))
        .catch(error => Observable.of(new UpdateClanFailAction(error)))
    );

  @Effect()
  deleteClan$: Observable<Action> = this.actions$
    .ofType(DELETE_CLAN)
    .map(toPayload)
    .switchMap(id =>
      this.clanDataService.deleteClan$(id)
        .map(() => new DeleteClanSuccessAction(id))
        .catch(error => Observable.of(new DeleteClanFailAction(error)))
    );

  @Effect()
  joinClan$: Observable<Action> = this.actions$
    .ofType(JOIN_CLAN)
    .map(toPayload)
    .switchMap(clanId =>
      this.userDataService.updateUser$({clan: clanId})
        .mergeMap(user => [
          new JoinClanSuccessAction({userId: user.id, clanId}),
          new LoadUserSuccessAction(user)
        ])
        .catch(error => Observable.of(new JoinClanFailAction(error)))
    );

  @Effect()
  quitClan$: Observable<Action> = this.actions$
    .ofType(QUIT_CLAN)
    .map(toPayload)
    .switchMap(() => this.clanService.clan$.take(1))
    .switchMap(clan =>
      this.userDataService.updateUser$({clan: null})
        .mergeMap(user => [
          new QuitClanSuccessAction({userId: user.id, clanId: clan.id}),
          new LoadUserSuccessAction(user)
        ])
        .catch(error => Observable.of(new QuitClanFailAction(error)))
    );


  @Effect()
  loadTribes$: Observable<Action> = this.actions$
    .ofType(LOAD_TRIBES)
    .switchMap(() =>
      this.tribeDataService.getTribes$()
        .map((tribes) => new LoadTribesSuccessAction(tribes))
        .catch(error => Observable.of(new LoadTribesFailAction(error)))
    );

  @Effect()
  loadTribe$: Observable<Action> = this.actions$
    .ofType(LOAD_TRIBE)
    .map(toPayload)
    .switchMap(id =>
      this.tribeDataService.getTribe$(id)
        .map(tribe => new LoadTribeSuccessAction(tribe))
        .catch(error => Observable.of(new LoadTribeFailAction(error)))
    );


  @Effect()
  addTribe$: Observable<Action> = this.actions$
    .ofType(ADD_TRIBE)
    .map(toPayload)
    .switchMap(tribe =>
      this.tribeDataService.createTribe$(tribe)
        .map(tribe => new AddTribeSuccessAction(tribe))
        .catch(error => Observable.of(new AddTribeFailAction(error)))
    );

  @Effect()
  updateTribe$: Observable<Action> = this.actions$
    .ofType(UPDATE_TRIBE)
    .map(toPayload)
    .switchMap((payload: UpdateTribeActionPayload) =>
      this.tribeDataService.updateTribe$(payload.id, payload.changes)
        .map(tribe => new UpdateTribeSuccessAction(tribe))
        .catch(error => Observable.of(new UpdateTribeFailAction(error)))
    );

  @Effect()
  deleteTribe$: Observable<Action> = this.actions$
    .ofType(DELETE_TRIBE)
    .map(toPayload)
    .switchMap(id =>
      this.tribeDataService.deleteTribe$(id)
        .map(() => new DeleteTribeSuccessAction(id))
        .catch(error => Observable.of(new DeleteTribeFailAction(error)))
    );

  @Effect()
  joinTribe$: Observable<Action> = this.actions$
    .ofType(JOIN_TRIBE)
    .map(toPayload)
    .switchMap(tribeId =>
      this.userDataService.updateUser$({tribe: tribeId})
        .mergeMap(user => [
          new JoinTribeSuccessAction({userId: user.id, tribeId}),
          new LoadUserSuccessAction(user)
        ])
        .catch(error => Observable.of(new JoinTribeFailAction(error)))
    );

  @Effect()
  quitTribe$: Observable<Action> = this.actions$
    .ofType(QUIT_TRIBE)
    .map(toPayload)
    .switchMap(() => this.tribeService.tribe$.take(1))
    .switchMap(tribe =>
      this.userDataService.updateUser$({tribe: null})
        .mergeMap(user => [
          new QuitTribeSuccessAction({userId: user.id, tribeId: tribe.id}),
          new LoadUserSuccessAction(user)
        ])
        .catch(error => Observable.of(new QuitTribeFailAction(error)))
    );
}
