import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Clan, PartialClan} from "../../models/clan";
import {ApiService} from "../api/api";

@Injectable()
export class ClanService {
  clansUrl = 'clans/';

  constructor(private apiService: ApiService) {
    console.log('Hello ClanService Provider');
  }

  public createClan$(name: string): Observable<Clan> {
    return this.apiService.post$(this.clansUrl, {name})
      .map(clan => this.mapApiClanToClan(clan))
  }

  public getClans$(): Observable<any[]> {
    return this.apiService.get$(this.clansUrl)
      .map(response => response
        .map(clan => this.mapApiClanToClan(clan)))
  }

  public getClan$(url: string): Observable<Clan> {
    return this.apiService.get$(url)
      .map(clan => this.mapApiClanToClan(clan))
  }

  public updateClan$(url: string, changes: PartialClan) {
    changes = this.mapClanToApiClan(changes);
    return this.apiService.patch$(url, changes)
      .map(clan => this.mapApiClanToClan(clan))
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
