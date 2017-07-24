import {Action} from '@ngrx/store';
import {ExperienceObject} from "../../models/experience";

export const LOAD_EXPERIENCE = '[Experience] Load experience';
export const LOAD_EXPERIENCE_SUCCESS = '[Experience] Load experience success';
export const LOAD_EXPERIENCE_FAIL = '[Experience] Load experience fail';

export class LoadExperienceAction implements Action {
  readonly type = LOAD_EXPERIENCE;
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
  LoadExperienceAction |
  LoadExperienceSuccessAction |
  LoadExperienceFailAction;
