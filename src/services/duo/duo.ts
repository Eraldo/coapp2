import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Duo, PartialDuo} from "../../models/duo";
import {ApiService} from "../api/api";
import {UserService} from "../user/user";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import * as community from '../../store/actions/community';

@Injectable()
export class DuoService {
  duosUrl = 'duos/';

  get duos$() {
    return this.store.select(fromRoot.getDuos)
  }

  get duo$(): Observable<Duo> {
    return this.store.select(fromRoot.getCurrentDuo);
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

  public loadOwnDuo() {
    this.userService.user$.subscribe(user => {
      this.store.dispatch(new community.LoadDuoAction(user.duo));
    })
  }

  public loadDuos() {
    this.store.dispatch(new community.LoadDuosAction());
  }

  public joinDuo$(duoId: string) {
    return Observable.combineLatest(this.userService.user$, this.getDuo$(duoId))
      .switchMap(([user, duo]) => {
        let members = duo.members;
        members.push(user.id);
        return this.updateDuo$(duo.id, {members});
      })
  }

  public quitDuo$() {
    return Observable.combineLatest(this.userService.user$, this.duo$)
      .switchMap(([user, duo]) => {
        const members = duo.members.filter(id => id != user.id);
        return this.updateDuo$(user.duo, {members})
      })
  }

  private mapApiDuoToDuo(object): Duo {
    const duo = new Duo({
      id: object.url,
      name: object.name,
      members: object.members,
      createdAt: object.created,
      modifiedAt: object.modified,
    });
    return duo;
  }

  private mapDuoToApiDuo(object: PartialDuo): Object {
    return object;
  }
}
