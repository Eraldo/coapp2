import {Action} from '@ngrx/store';
import {Scope} from "../../models/scope";

export const SET_SCOPE = '[Scope] Set';


export class SetScopeAction implements Action {
  readonly type = SET_SCOPE;

  constructor(public payload: Scope) {
  }
}


export type Actions =
  SetScopeAction;
