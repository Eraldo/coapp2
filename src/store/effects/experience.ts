import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {LOGIN_SUCCESS} from "../actions/users";
import {ExperienceDataService} from "../../services/experience/experience-data";
import {LOAD_EXPERIENCE, LoadExperienceSuccessAction} from "../actions/experience";
import {App} from "../../models/app";

@Injectable()
export class ExperienceEffects {

  constructor(private actions$: Actions, private experienceDataService: ExperienceDataService) {
  }

  @Effect()
  loadExperience$: Observable<Action> = this.actions$
    .ofType(LOAD_EXPERIENCE, LOGIN_SUCCESS)
    .switchMap(() =>
      Observable.combineLatest(
        this.experienceDataService.getStatus$()
          .map(exp => new LoadExperienceSuccessAction({app: 'app', status: exp})),
        this.experienceDataService.getStatus$(App.arcade)
          .map(exp => new LoadExperienceSuccessAction({app: App.arcade, status: exp})),
        this.experienceDataService.getStatus$(App.office)
          .map(exp => new LoadExperienceSuccessAction({app: App.office, status: exp})),
        this.experienceDataService.getStatus$(App.community)
          .map(exp => new LoadExperienceSuccessAction({app: App.community, status: exp})),
        this.experienceDataService.getStatus$(App.studio)
          .map(exp => new LoadExperienceSuccessAction({app: App.studio, status: exp})),
        this.experienceDataService.getStatus$(App.academy)
          .map(exp => new LoadExperienceSuccessAction({app: App.academy, status: exp})),
        this.experienceDataService.getStatus$(App.journey)
          .map(exp => new LoadExperienceSuccessAction({app: App.journey, status: exp})),
      )
      .mergeMap(experiences => experiences)
    );
}
