import {Action} from '@ngrx/store';
import {Duo, PartialDuo} from "../../models/duo";

export const LOAD_DUO = '[Duos] Load duo';
export const LOAD_DUO_SUCCESS = '[Duos] Load duo success';
export const LOAD_DUO_FAIL = '[Duos] Load duo fail';

export const LOAD_DUOS = '[Duos] Load duos';
export const LOAD_DUOS_SUCCESS = '[Duos] Load duos success';
export const LOAD_DUOS_FAIL = '[Duos] Load duos fail';

export const ADD_DUO = '[Duos] Add duo';
export const ADD_DUO_SUCCESS = '[Duos] Add duo success';
export const ADD_DUO_FAIL = '[Duos] Add duo fail';

export const UPDATE_DUO = '[Duos] Update duo';
export const UPDATE_DUO_SUCCESS = '[Duos] Update duo success';
export const UPDATE_DUO_FAIL = '[Duos] Update duo fail';

export const DELETE_DUO = '[Duos] Delete duo';
export const DELETE_DUO_SUCCESS = '[Duos] Delete duo success';
export const DELETE_DUO_FAIL = '[Duos] Delete duo fail';

export const JOIN_DUO = '[Duos] Join duo';
export const JOIN_DUO_SUCCESS = '[Duos] Join duo success';
export const JOIN_DUO_FAIL = '[Duos] Join duo fail';

export const QUIT_DUO = '[Duos] Quit duo';
export const QUIT_DUO_SUCCESS = '[Duos] Quit duo success';
export const QUIT_DUO_FAIL = '[Duos] Quit duo fail';


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


export class AddDuoAction implements Action {
  readonly type = ADD_DUO;

  constructor(public payload: PartialDuo) {
  }
}

export class AddDuoSuccessAction implements Action {
  readonly type = ADD_DUO_SUCCESS;

  constructor(public payload: Duo) {
  }
}

export class AddDuoFailAction implements Action {
  readonly type = ADD_DUO_FAIL;

  constructor(public payload: string) {
  }
}

export interface UpdateDuoActionPayload {
  id: string,
  changes: PartialDuo
}

export class UpdateDuoAction implements Action {
  readonly type = UPDATE_DUO;

  constructor(public payload: UpdateDuoActionPayload) {
  }
}

export class UpdateDuoSuccessAction implements Action {
  readonly type = UPDATE_DUO_SUCCESS;

  constructor(public payload: Duo) {
  }
}

export class UpdateDuoFailAction implements Action {
  readonly type = UPDATE_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export class DeleteDuoAction implements Action {
  readonly type = DELETE_DUO;

  constructor(public payload: string) {
  }
}

export class DeleteDuoSuccessAction implements Action {
  readonly type = DELETE_DUO_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteDuoFailAction implements Action {
  readonly type = DELETE_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export class JoinDuoAction implements Action {
  readonly type = JOIN_DUO;

  constructor(public payload: string) {
  }
}

export class JoinDuoSuccessAction implements Action {
  readonly type = JOIN_DUO_SUCCESS;

  constructor(public payload: {userId: string, duoId: string}) {
  }
}

export class JoinDuoFailAction implements Action {
  readonly type = JOIN_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export class QuitDuoAction implements Action {
  readonly type = QUIT_DUO;
}

export class QuitDuoSuccessAction implements Action {
  readonly type = QUIT_DUO_SUCCESS;

  constructor(public payload: {userId: string, duoId: string}) {
  }
}

export class QuitDuoFailAction implements Action {
  readonly type = QUIT_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions =
  LoadDuoAction |
  LoadDuoSuccessAction |
  LoadDuoFailAction |

  LoadDuosAction |
  LoadDuosSuccessAction |
  LoadDuosFailAction |

  AddDuoAction |
  AddDuoSuccessAction |
  AddDuoFailAction |

  UpdateDuoAction |
  UpdateDuoSuccessAction |
  UpdateDuoFailAction |

  DeleteDuoAction |
  DeleteDuoSuccessAction |
  DeleteDuoFailAction |

  JoinDuoAction |
  JoinDuoSuccessAction |
  JoinDuoFailAction |

  QuitDuoAction |
  QuitDuoSuccessAction |
  QuitDuoFailAction;
