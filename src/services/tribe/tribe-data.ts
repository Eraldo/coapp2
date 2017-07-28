import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Tribe, PartialTribe} from "../../models/tribe";
import {ApiService} from "../api/api";

@Injectable()
export class TribeDataService {
  tribesUrl = 'tribes/';

  constructor(private apiService: ApiService) {
    console.log('Hello TribeDataService Provider');
  }

  createTribe$(name: string, members?: string[]): Observable<Tribe> {
    return this.apiService.post$(this.tribesUrl, {name, members})
      .map(tribe => this.mapApiTribeToTribe(tribe))
  }

  getTribes$(): Observable<any[]> {
    return this.apiService.get$(this.tribesUrl)
      .map(response => response
        .map(tribe => this.mapApiTribeToTribe(tribe)))
      .catch(error => Observable.of(undefined));
  }

  getTribe$(url: string): Observable<Tribe> {
    return this.apiService.get$(url)
      .map(tribe => this.mapApiTribeToTribe(tribe))
      .catch(error => Observable.of(undefined));
  }

  updateTribe$(url: string, changes: PartialTribe) {
    changes = this.mapTribeToApiTribe(changes);
    return this.apiService.patch$(url, changes)
      .map(tribe => this.mapApiTribeToTribe(tribe))
  }

  deleteTribe$(id: string) {
    return this.apiService.delete$(id)
  }

  private mapApiTribeToTribe(object): Tribe {
    const tribe = new Tribe({
      id: object.url,
      name: object.name,
      members: object.members,
      createdAt: object.created,
      modifiedAt: object.modified,
    });
    return tribe;
  }

  private mapTribeToApiTribe(object: PartialTribe): Object {
    return object;
  }
}
