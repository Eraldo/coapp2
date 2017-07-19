import {Action} from '@ngrx/store';
import {Outcome, PartialOutcome} from "../../models/outcome";

export const LOAD_OUTCOME = '[Outcomes] Load outcome';
export const LOAD_OUTCOME_SUCCESS = '[Outcomes] Load outcome success';
export const LOAD_OUTCOME_FAIL = '[Outcomes] Load outcome fail';

export const LOAD_OUTCOMES = '[Outcomes] Load outcomes';
export const LOAD_OUTCOMES_SUCCESS = '[Outcomes] Load outcomes success';
export const LOAD_OUTCOMES_FAIL = '[Outcomes] Load outcomes fail';

export const ADD_OUTCOME = '[Outcomes] Add outcome';
export const ADD_OUTCOME_SUCCESS = '[Outcomes] Add outcome success';
export const ADD_OUTCOME_FAIL = '[Outcomes] Add outcome fail';

export const UPDATE_OUTCOME = '[Outcomes] Update outcome';
export const UPDATE_OUTCOME_SUCCESS = '[Outcomes] Update outcome success';
export const UPDATE_OUTCOME_FAIL = '[Outcomes] Update outcome fail';

export const DELETE_OUTCOME = '[Outcomes] Delete outcome';
export const DELETE_OUTCOME_SUCCESS = '[Outcomes] Delete outcome success';
export const DELETE_OUTCOME_FAIL = '[Outcomes] Delete outcome fail';


export class LoadOutcomeAction implements Action {
  readonly type = LOAD_OUTCOME;

  constructor(public payload: string) {
  }
}

export class LoadOutcomeSuccessAction implements Action {
  readonly type = LOAD_OUTCOME_SUCCESS;

  constructor(public payload: Outcome) {
  }
}

export class LoadOutcomeFailAction implements Action {
  readonly type = LOAD_OUTCOME_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadOutcomesAction implements Action {
  readonly type = LOAD_OUTCOMES;
}

export class LoadOutcomesSuccessAction implements Action {
  readonly type = LOAD_OUTCOMES_SUCCESS;

  constructor(public payload: Outcome[]) {
  }
}

export class LoadOutcomesFailAction implements Action {
  readonly type = LOAD_OUTCOMES_FAIL;

  constructor(public payload: string) {
  }
}


export class AddOutcomeAction implements Action {
  readonly type = ADD_OUTCOME;

  constructor(public payload: PartialOutcome) {
  }
}

export class AddOutcomeSuccessAction implements Action {
  readonly type = ADD_OUTCOME_SUCCESS;

  constructor(public payload: Outcome) {
  }
}

export class AddOutcomeFailAction implements Action {
  readonly type = ADD_OUTCOME_FAIL;

  constructor(public payload: string) {
  }
}

export interface UpdateOutcomeActionPayload {id: string, changes: PartialOutcome}
export class UpdateOutcomeAction implements Action {
  readonly type = UPDATE_OUTCOME;

  constructor(public payload: UpdateOutcomeActionPayload) {
  }
}

export class UpdateOutcomeSuccessAction implements Action {
  readonly type = UPDATE_OUTCOME_SUCCESS;

  constructor(public payload: Outcome) {
  }
}

export class UpdateOutcomeFailAction implements Action {
  readonly type = UPDATE_OUTCOME_FAIL;

  constructor(public payload: string) {
  }
}


export class DeleteOutcomeAction implements Action {
  readonly type = DELETE_OUTCOME;

  constructor(public payload: string) {
  }
}

export class DeleteOutcomeSuccessAction implements Action {
  readonly type = DELETE_OUTCOME_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteOutcomeFailAction implements Action {
  readonly type = DELETE_OUTCOME_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions =
  LoadOutcomeAction |
  LoadOutcomeSuccessAction |
  LoadOutcomeFailAction |

  LoadOutcomesAction |
  LoadOutcomesSuccessAction |
  LoadOutcomesFailAction |

  AddOutcomeAction |
  AddOutcomeSuccessAction |
  AddOutcomeFailAction |

  UpdateOutcomeAction |
  UpdateOutcomeSuccessAction |
  UpdateOutcomeFailAction |

  DeleteOutcomeAction |
  DeleteOutcomeSuccessAction |
  DeleteOutcomeFailAction;
