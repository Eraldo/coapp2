import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Scope} from "../../models/scope";
import {Focus, PartialFocus} from "../../models/focus";
import moment from "moment";
import {ApiService} from "../api/api";

@Injectable()
export class FocusDataService {
  focusUrl = 'focus/';

  constructor(public http: Http, private apiService: ApiService) {
    console.log('Hello FocusDataService Provider');
  }

  public createFocus$(focus: PartialFocus): Observable<Focus> {
    return this.apiService.post$(this.focusUrl, focus)
      .map(focus => this.mapApiFocusToFocus(focus))
  }

  public getFocuses$(): Observable<any[]> {
    return this.apiService.get$(this.focusUrl)
      .map(response => response
        .map(focus => this.mapApiFocusToFocus(focus)))
  }

  public getFocus$(scope: Scope, start: string): Observable<Focus> {
    start = moment(start).format("YYYY-MM-DD");
    return this.apiService.get$(this.focusUrl, {scope, start})
      .map(response => response
        .map(focus => this.mapApiFocusToFocus(focus)))
      .map(focuses => focuses[0])
  }

  public updateFocus$(url: string, changes: PartialFocus) {
    changes = this.mapFocusToApiFocus(changes);
    return this.apiService.patch$(url, changes)
      .map(focus => this.mapApiFocusToFocus(focus))
  }

  public deleteFocus$(id: string) {
    return this.apiService.delete$(id)
  }

  public setFocus$(scope: Scope, start: string, id: string): Observable<Focus> {
    return this.getFocus$(scope, start)
      .switchMap(focus => {
        if (!focus) {
          return this.createFocus$({scope, start});
        } else {
          return Observable.of(focus);
        }
      })
      .switchMap(focus => {
        if (!focus) {
          return Observable.throw('Focus does not exist.')
        }
        let changes = {};
        if (!focus.outcome1) {
          changes['outcome1'] = id
        } else if (!focus.outcome2) {
          changes['outcome2'] = id
        } else if (!focus.outcome3) {
          changes['outcome3'] = id
        } else if (!focus.outcome4) {
          changes['outcome4'] = id
        } else {
          return Observable.throw('Maximum of 4 outcomes reached.')
        }
        return this.updateFocus$(focus.id, changes)
      })
  }

  public unsetFocus$(scope: Scope, start: string, id: string): Observable<Focus> {
    return this.getFocus$(scope, start)
      .switchMap(focus => {
        if (!focus) {
          return this.createFocus$({scope, start});
        } else {
          return Observable.of(focus);
        }
      })
      .switchMap(focus => {
        if (!focus) {
          return Observable.throw('Focus does not exist.')
        }
        console.log('unsetting', focus);
        let changes = {};
        if (focus.outcome1 && focus.outcome1 == id) {
          changes['outcome1'] = null;
        } else if (focus.outcome2 && focus.outcome2 == id) {
          changes['outcome2'] = null;
        } else if (focus.outcome3 && focus.outcome3 == id) {
          changes['outcome3'] = null;
        } else if (focus.outcome4 && focus.outcome4 == id) {
          changes['outcome4'] = null;
        } else {
          return Observable.throw('Cannot unset focus: Outcome not found.')
        }
        return this.updateFocus$(focus.id, changes)
      })
  }

  private mapApiFocusToFocus(object): Focus {
    const focus = new Focus({
      id: object.url,
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

  private mapFocusToApiFocus(object: PartialFocus): Object {
    // Making the object mutable
    object = Object.assign({}, object);

    if (object.hasOwnProperty('outcome1')) {
      object['outcome_1'] = object.outcome1;
      delete object.outcome1;
    }
    if (object.hasOwnProperty('outcome2')) {
      object['outcome_2'] = object.outcome2;
      delete object.outcome2;
    }
    if (object.hasOwnProperty('outcome3')) {
      object['outcome_3'] = object.outcome3;
      delete object.outcome3;
    }
    if (object.hasOwnProperty('outcome4')) {
      object['outcome_4'] = object.outcome4;
      delete object.outcome4;
    }
    return object;
  }
}
