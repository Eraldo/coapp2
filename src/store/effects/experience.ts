import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {LOGIN_SUCCESS} from "../actions/users";
import {ExperienceDataService} from "../../services/experience/experience-data";
import {
  LOAD_EXPERIENCE, LOAD_EXPERIENCES, LoadExperienceAction,
  LoadExperienceSuccessAction
} from "../actions/experience";
import {App} from "../../models/app";

@Injectable()
export class ExperienceEffects {

  constructor(private actions$: Actions, private experienceDataService: ExperienceDataService) {
  }

  @Effect()
  loadExperiences$: Observable<Action> = this.actions$
    .ofType(LOAD_EXPERIENCES, LOGIN_SUCCESS)
    .mergeMap(() => [
        new LoadExperienceAction({app: 'app'}),
        new LoadExperienceAction({app: App.home}),
        new LoadExperienceAction({app: App.arcade}),
        new LoadExperienceAction({app: App.office}),
        new LoadExperienceAction({app: App.community}),
        new LoadExperienceAction({app: App.studio}),
        new LoadExperienceAction({app: App.academy}),
        new LoadExperienceAction({app: App.journey})
      ]
    );

  @Effect()
  loadExperience$: Observable<Action> = this.actions$
    .ofType(LOAD_EXPERIENCE)
    .map(toPayload)
    .concatMap(payload => {
      const app = payload.app == 'app' ? undefined : payload.app;
      return this.experienceDataService.getStatus$(app)
        .map(exp => new LoadExperienceSuccessAction({app: payload.app, status: exp}))
    });
}
