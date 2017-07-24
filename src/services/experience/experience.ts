import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {App} from "../../models/app";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {ExperienceObject} from "../../models/experience";

@Injectable()
export class ExperienceService {

  constructor(private store: Store<fromRoot.State>) {
    console.log('Hello ExperienceService Provider');
  }

  get status$() {
    return this.store.select(fromRoot.getExperience)
  }

  public getStatus$(app?: App): Observable<ExperienceObject> {
    return this.status$.map(exp => exp[app] || exp['app']);
  }

  public getExperience$(app?: App, level?: number): Observable<any[]> {
    return Observable.of()
    // const url = `${this.experienceUrl}total/`;
    // return this.apiService.get$(url, {app, level});
  }

  public getLevel$(app?: App): Observable<any[]> {
    return Observable.of()
    // const url = `${this.experienceUrl}level/`;
    // return this.apiService.get$(url, {app});
  }
}
