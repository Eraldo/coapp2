import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Duo, PartialDuo} from "../../models/duo";
import {ApiService} from "../api/api";

@Injectable()
export class DuoDataService {
  duosUrl = 'duos/';

  constructor(private apiService: ApiService) {
    console.log('Hello DuoDataService Provider');
  }

  createDuo$(name: string, members?: string[]): Observable<Duo> {
    return this.apiService.post$(this.duosUrl, {name, members})
      .map(duo => this.mapApiDuoToDuo(duo))
  }

  getDuos$(): Observable<any[]> {
    return this.apiService.get$(this.duosUrl)
      .map(response => response
        .map(duo => this.mapApiDuoToDuo(duo)))
      .catch(error => Observable.of(undefined));
  }

  getDuo$(url: string): Observable<Duo> {
    return this.apiService.get$(url)
      .map(duo => this.mapApiDuoToDuo(duo))
      .catch(error => Observable.of(undefined));
  }

  updateDuo$(url: string, changes: PartialDuo) {
    changes = this.mapDuoToApiDuo(changes);
    return this.apiService.patch$(url, changes)
      .map(duo => this.mapApiDuoToDuo(duo))
  }

  deleteDuo$(id: string) {
    return this.apiService.delete$(id)
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
