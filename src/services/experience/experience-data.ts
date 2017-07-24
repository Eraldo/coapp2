import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {App} from "../../models/app";
import {ApiService} from "../api/api";
import {ExperienceObject} from "../../models/experience";

@Injectable()
export class ExperienceDataService {
  experienceUrl = 'experience/';

  constructor(private apiService: ApiService) {
    console.log('Hello ExperienceDataService Provider');
  }

  public getStatus$(app?: App): Observable<ExperienceObject> {
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
