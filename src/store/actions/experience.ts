import {Action} from '@ngrx/store';
import {ExperienceObject} from "../../models/experience";

export const LOAD_EXPERIENCES = '[Experience] Load experiences';
export const LOAD_EXPERIENCES_SUCCESS = '[Experience] Load experiences success';
export const LOAD_EXPERIENCES_FAIL = '[Experience] Load experiences fail';

export const LOAD_EXPERIENCE = '[Experience] Load experience';
export const LOAD_EXPERIENCE_SUCCESS = '[Experience] Load experience success';
export const LOAD_EXPERIENCE_FAIL = '[Experience] Load experience fail';


export class LoadExperiencesAction implements Action {
  readonly type = LOAD_EXPERIENCES;
}

export class LoadExperiencesSuccessAction implements Action {
  readonly type = LOAD_EXPERIENCES_SUCCESS;
}

export class LoadExperiencesFailAction implements Action {
  readonly type = LOAD_EXPERIENCES_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadExperienceAction implements Action {
  readonly type = LOAD_EXPERIENCE;

  constructor(public payload: {app?: string}) {
  }
}

export class LoadExperienceSuccessAction implements Action {
  readonly type = LOAD_EXPERIENCE_SUCCESS;

  constructor(public payload: {app: string, status: ExperienceObject}) {
  }
}

export class LoadExperienceFailAction implements Action {
  readonly type = LOAD_EXPERIENCE_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions =
  LoadExperiencesAction |
  LoadExperiencesSuccessAction |
  LoadExperiencesFailAction |

  LoadExperienceAction |
  LoadExperienceSuccessAction |
  LoadExperienceFailAction;
