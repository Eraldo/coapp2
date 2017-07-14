import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Duo, PartialDuo} from "../../models/duo";
import {ApiService} from "../api/api";
import {UserService} from "../user/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import * as community from '../../store/actions/community';

@Injectable()
export class DuoService {
  duosUrl = 'duos/';
  _duos$ = new BehaviorSubject<Duo[]>([]);
  _loading$ = new BehaviorSubject<boolean>(false);
  _loaded$ = new BehaviorSubject<boolean>(false);

  get duos$() {
    this.store.dispatch(new community.LoadDuosAction());
    return this.store.select(fromRoot.getDuos)
  }

  get loading$() {
    return this._loading$.asObservable()
  }

  constructor(private apiService: ApiService, private userService: UserService, private store: Store<fromRoot.State>) {
    console.log('Hello DuoService Provider');
  }

  public createDuo$(name: string, members?: string[]): Observable<Duo> {
    return this.apiService.post$(this.duosUrl, {name, members})
      .map(duo => this.mapApiDuoToDuo(duo))
  }

  public getDuos$(): Observable<any[]> {
    return this.apiService.get$(this.duosUrl)
      .map(response => response
        .map(duo => this.mapApiDuoToDuo(duo)))
      .catch(error => Observable.of(undefined));
  }

  public getDuo$(url: string): Observable<Duo> {
    return this.apiService.get$(url)
      .map(duo => this.mapApiDuoToDuo(duo))
      .catch(error => Observable.of(undefined));
  }

  public updateDuo$(url: string, changes: PartialDuo) {
    changes = this.mapDuoToApiDuo(changes);
    return this.apiService.patch$(url, changes)
      .map(duo => this.mapApiDuoToDuo(duo))
  }

  private deleteDuo$(id: string) {
    return this.apiService.delete$(id)
  }

  public loadOwnDuo$() {
    return this.userService.user$.switchMap(user => this.getDuo$(user.duo));
  }

  get duo$(): Observable<Duo> {
    return this.userService.user$.switchMap(user => {
      return this._duos$.map(duos => duos.filter(duo => duo.id == user.duo)[0]);
    })
  }

  public joinDuo$(duoId: string) {
    return Observable.combineLatest(this.userService.user$, this.getDuo$(duoId))
      .switchMap(([user, duo]) => {
        let members = duo.members;
        members.push(user.id);
        return this.updateDuo$(duo.id, {members});
      })
      // Refresh user
      .do(() => this.userService.loadUser$().take(1).subscribe()) // refresh user
  }

  public quitDuo$() {
    return Observable.combineLatest(this.userService.user$, this.duo$)
      .switchMap(([user, duo]) => {
        const members = duo.members.filter(id => id != user.id);
        return this.updateDuo$(user.duo, {members})
    })
      // Refresh user
      .do(() => this.userService.loadUser$().take(1).subscribe()) // refresh user
  }

  private mapApiDuoToDuo(object): Duo {
    const duo = new Duo({
      id: object.url,
      name: object.name,
      members: object.members,
      createdAt: object.created,
      modifiedAt: object.modified,
    });
    return this.updateLocalDuo(duo)
  }

  private mapDuoToApiDuo(object: PartialDuo): Object {
    return object;
  }

  private updateLocalDuo(newDuo: Duo) {
    const found = this._duos$.value.find(duo => duo.id == newDuo.id);
    if (found) {
      // update local duo by replacing it
      const duos = this._duos$.value.map(duo => {
        return (duo.id == newDuo.id) ? newDuo : duo;
      });
      this._duos$.next(duos)
    } else {
      // add the new duo to local duos
      const duos = this._duos$.value.unshift(newDuo)
    }
    return newDuo;
  }
}
