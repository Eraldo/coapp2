import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user";
import {App} from "../../models/app";

@Injectable()
export class ExperienceService {
  apiUrl = 'http://127.0.0.1:8004/api/';
  experienceUrl = this.apiUrl + 'experience/';

  constructor(public http: Http, private userService: UserService) {
    console.log('Hello ExperienceService Provider');
  }

  public getStatus$(app?: App): Observable<{'experience': number, 'level': number, 'next': number}> {
    let options = this.userService.getApiOptions();
    if (app) {
      options.params.set('app', app.toString());
    }
    const url = `${this.experienceUrl}status/`;
    return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  public getExperience$(app?: App, level?: number): Observable<any[]> {
    let options = this.userService.getApiOptions();
    if (app) {
      options.params.set('app', app.toString());
    }
    if (level) {
      options.params.set('level', level.toString());
    }
    const url = `${this.experienceUrl}total/`;
    return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  public getLevel$(app?: App): Observable<any[]> {
    let options = this.userService.getApiOptions();
    if (app) {
      options.params.set('app', app.toString());
    }
    const url = `${this.experienceUrl}level/`;
    return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }
}
