import {Action} from '@ngrx/store';

export const SET_DATE = '[Date] Set';


export class SetDateAction implements Action {
  readonly type = SET_DATE;

  constructor(public payload: string) {
  }
}


export type Actions =
  SetDateAction;
