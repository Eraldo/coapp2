import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {App} from "../../models/app";
import {ApiService} from "../api/api";

@Injectable()
export class ExperienceService {
  experienceUrl = 'experience/';

  constructor(public http: Http, private apiService: ApiService) {
    console.log('Hello ExperienceService Provider');
  }

  public getStatus$(app?: App): Observable<{'experience': number, 'level': number, 'next': number}> {
    const url = `${this.experienceUrl}status/`;
    return this.apiService.get$(url, {app});
  }

  public getExperience$(app?: App, level?: number): Observable<any[]> {
    const url = `${this.experienceUrl}total/`;
    return this.apiService.get$(url, {app, level});
  }

  public getLevel$(app?: App): Observable<any[]> {
    const url = `${this.experienceUrl}level/`;
    return this.apiService.get$(url, {app});
  }
}
