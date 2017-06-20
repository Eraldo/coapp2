import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user";
import {Scope} from "../../models/scope";

@Injectable()
export class FocusService {
  apiUrl = 'http://127.0.0.1:8004/api/';
  focusUrl = this.apiUrl + 'focus/';

  constructor(public http: Http, private userService: UserService) {
    console.log('Hello FocusService Provider');
  }

  public getFocus$(scope: Scope, start: string): Observable<any[]> {
    const url = `${this.focusUrl}?scope=${scope}&start=${start}`;
    return this.http.get(url, this.userService.getApiOptions())
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      // .map(response => response
      // // Converting api objects to Focuses.
      //   .map(focus => this.mapApiFocusToFocus(focus)))
  }
}
