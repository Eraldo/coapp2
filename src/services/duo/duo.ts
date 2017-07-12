import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Duo, PartialDuo} from "../../models/duo";
import {ApiService} from "../api/api";
import {UserService} from "../user/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DuoService {
  duosUrl = 'duos/';
  _duos$ = new BehaviorSubject<Duo[]>([]);
  _loading$ = new BehaviorSubject<boolean>(false);

  get duos$() {
    return this._duos$.asObservable()
  }

  get loading$() {
    return this._loading$.asObservable()
  }

  constructor(private apiService: ApiService, private userService: UserService) {
    console.log('Hello DuoService Provider');
  }

  public createDuo$(name: string, members?: string[] ): Observable<Duo> {
    return this.apiService.post$(this.duosUrl, {name, members})
      .map(duo => this.mapApiDuoToDuo(duo))
  }

  public getDuos$(): Observable<any[]> {
    return this.apiService.get$(this.duosUrl)
      .map(response => response
        .map(duo => this.mapApiDuoToDuo(duo)))
  }

  public getDuo$(url: string): Observable<Duo> {
    return this.apiService.get$(url)
      .map(duo => this.mapApiDuoToDuo(duo))
  }

  public updateDuo$(url: string, changes: PartialDuo) {
    changes = this.mapDuoToApiDuo(changes);
    return this.apiService.patch$(url, changes)
      .map(duo => this.mapApiDuoToDuo(duo))
  }

  private deleteDuo$(id: string) {
    return this.apiService.delete$(id)
  }

  get duo$(): Observable<Duo> {
    return this.userService.user$.switchMap(user => this.getDuo$(user.duo))
  }

  public quitDuo$() {
    return Observable.combineLatest(this.userService.user$, this.duo$, (user, duo) => {
      const members = duo.members.filter(id => id != user.id);
      this.updateDuo$(user.duo, {members}).subscribe(duo => {return duo})
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
