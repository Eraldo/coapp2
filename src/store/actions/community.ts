import {Action} from '@ngrx/store';
import {Duo} from "../../models/duo";

export const LOAD_DUO = '[Duos] Load duo';
export const LOAD_DUO_SUCCESS = '[Duos] Load duo success';
export const LOAD_DUO_FAIL = '[Duos] Load duo fail';
export const LOAD_DUOS = '[Duos] Load duos';
export const LOAD_DUOS_SUCCESS = '[Duos] Load duos success';
export const LOAD_DUOS_FAIL = '[Duos] Load duos fail';


export class LoadDuoAction implements Action {
  readonly type = LOAD_DUO;

  constructor(public payload: string) {
  }
}

export class LoadDuoSuccessAction implements Action {
  readonly type = LOAD_DUO_SUCCESS;

  constructor(public payload: Duo) {
  }
}

export class LoadDuoFailAction implements Action {
  readonly type = LOAD_DUO_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadDuosAction implements Action {
  readonly type = LOAD_DUOS;
}

export class LoadDuosSuccessAction implements Action {
  readonly type = LOAD_DUOS_SUCCESS;

  constructor(public payload: Duo[]) {
  }
}

export class LoadDuosFailAction implements Action {
  readonly type = LOAD_DUOS_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions
  = LoadDuoAction
  | LoadDuoSuccessAction
  | LoadDuoFailAction
  | LoadDuosAction
  | LoadDuosSuccessAction
  | LoadDuosFailAction;
