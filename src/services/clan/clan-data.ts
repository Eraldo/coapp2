import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Clan, PartialClan} from "../../models/clan";
import {ApiService} from "../api/api";

@Injectable()
export class ClanDataService {
  clansUrl = 'clans/';

  constructor(private apiService: ApiService) {
    console.log('Hello ClanDataService Provider');
  }

  createClan$(name: string, members?: string[]): Observable<Clan> {
    return this.apiService.post$(this.clansUrl, {name, members})
      .map(clan => this.mapApiClanToClan(clan))
  }

  getClans$(): Observable<any[]> {
    return this.apiService.get$(this.clansUrl)
      .map(response => response
        .map(clan => this.mapApiClanToClan(clan)))
      .catch(error => Observable.of(undefined));
  }

  getClan$(url: string): Observable<Clan> {
    return this.apiService.get$(url)
      .map(clan => this.mapApiClanToClan(clan))
      .catch(error => Observable.of(undefined));
  }

  updateClan$(url: string, changes: PartialClan) {
    changes = this.mapClanToApiClan(changes);
    return this.apiService.patch$(url, changes)
      .map(clan => this.mapApiClanToClan(clan))
  }

  deleteClan$(id: string) {
    return this.apiService.delete$(id)
  }

  private mapApiClanToClan(object): Clan {
    const clan = new Clan({
      id: object.url,
      name: object.name,
      members: object.members,
      createdAt: object.created,
      modifiedAt: object.modified,
    });
    return clan;
  }

  private mapClanToApiClan(object: PartialClan): Object {
    return object;
  }
}
