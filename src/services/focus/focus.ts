import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user";
import {Scope} from "../../models/scope";
import {Focus} from "../../models/focus";

@Injectable()
export class FocusService {
  apiUrl = 'http://127.0.0.1:8004/api/';
  focusUrl = this.apiUrl + 'focus/';

  constructor(public http: Http, private userService: UserService) {
    console.log('Hello FocusService Provider');
  }

  public getFocuses$(scope: Scope, start: string): Observable<any[]> {
    const url = `${this.focusUrl}?scope=${scope}&start=${start}`;
    return this.http.get(url, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .map(response => response
        .map(focus => this.mapApiFocusToFocus(focus)))
  }

  public getFocus$(scope: Scope, start: string): Observable<Focus> {
    const url = `${this.focusUrl}?scope=${scope}&start=${start}`;
    return this.http.get(url, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .map(response => response
        .map(focus => this.mapApiFocusToFocus(focus)))
      .map(focuses => focuses[0])
  }

  private mapApiFocusToFocus(object): Focus {
    const focus = new Focus({
      id: object.id,
      owner: object.owner,
      scope: object.scope,
      start: object.start,
      outcome1: object.outcome_1,
      outcome2: object.outcome_2,
      outcome3: object.outcome_3,
      outcome4: object.outcome_4,
      createdAt: object.created,
      modifiedAt: object.modified,
    });
    return focus;
  }
}
