import {Action} from '@ngrx/store';
import {JournalEntry, PartialJournalEntry} from "../../models/journal";

export const LOAD_JOURNAL_ENTRY = '[Journal] Load journal entry';
export const LOAD_JOURNAL_ENTRY_SUCCESS = '[Journal] Load journal entry success';
export const LOAD_JOURNAL_ENTRY_FAIL = '[Journal] Load journal entry fail';

export const LOAD_JOURNAL_ENTRIES = '[Journal] Load journal entries';
export const LOAD_JOURNAL_ENTRIES_SUCCESS = '[Journal] Load journal entries success';
export const LOAD_JOURNAL_ENTRIES_FAIL = '[Journal] Load journal entries fail';

export const ADD_JOURNAL_ENTRY = '[Journal] Add journal entry';
export const ADD_JOURNAL_ENTRY_SUCCESS = '[Journal] Add journal entry success';
export const ADD_JOURNAL_ENTRY_FAIL = '[Journal] Add journal entry fail';

export const UPDATE_JOURNAL_ENTRY = '[Journal] Update journal entry';
export const UPDATE_JOURNAL_ENTRY_SUCCESS = '[Journal] Update journal entry success';
export const UPDATE_JOURNAL_ENTRY_FAIL = '[Journal] Update journal entry fail';

export const DELETE_JOURNAL_ENTRY = '[Journal] Delete journal entry';
export const DELETE_JOURNAL_ENTRY_SUCCESS = '[Journal] Delete journal entry success';
export const DELETE_JOURNAL_ENTRY_FAIL = '[Journal] Delete journal entry fail';


export class LoadJournalEntryAction implements Action {
  readonly type = LOAD_JOURNAL_ENTRY;

  constructor(public payload: string) {
  }
}

export class LoadJournalEntrySuccessAction implements Action {
  readonly type = LOAD_JOURNAL_ENTRY_SUCCESS;

  constructor(public payload: JournalEntry) {
  }
}

export class LoadJournalEntryFailAction implements Action {
  readonly type = LOAD_JOURNAL_ENTRY_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadJournalEntriesAction implements Action {
  readonly type = LOAD_JOURNAL_ENTRIES;
}

export class LoadJournalEntriesSuccessAction implements Action {
  readonly type = LOAD_JOURNAL_ENTRIES_SUCCESS;

  constructor(public payload: JournalEntry[]) {
  }
}

export class LoadJournalEntriesFailAction implements Action {
  readonly type = LOAD_JOURNAL_ENTRIES_FAIL;

  constructor(public payload: string) {
  }
}


export class AddJournalEntryAction implements Action {
  readonly type = ADD_JOURNAL_ENTRY;

  constructor(public payload: PartialJournalEntry) {
  }
}

export class AddJournalEntrySuccessAction implements Action {
  readonly type = ADD_JOURNAL_ENTRY_SUCCESS;

  constructor(public payload: JournalEntry) {
  }
}

export class AddJournalEntryFailAction implements Action {
  readonly type = ADD_JOURNAL_ENTRY_FAIL;

  constructor(public payload: string) {
  }
}


export interface UpdateJournalEntryActionPayload {
  id: string,
  changes: PartialJournalEntry
}

export class UpdateJournalEntryAction implements Action {
  readonly type = UPDATE_JOURNAL_ENTRY;

  constructor(public payload: UpdateJournalEntryActionPayload) {
  }
}

export class UpdateJournalEntrySuccessAction implements Action {
  readonly type = UPDATE_JOURNAL_ENTRY_SUCCESS;

  constructor(public payload: JournalEntry) {
  }
}

export class UpdateJournalEntryFailAction implements Action {
  readonly type = UPDATE_JOURNAL_ENTRY_FAIL;

  constructor(public payload: string) {
  }
}


export class DeleteJournalEntryAction implements Action {
  readonly type = DELETE_JOURNAL_ENTRY;

  constructor(public payload: string) {
  }
}

export class DeleteJournalEntrySuccessAction implements Action {
  readonly type = DELETE_JOURNAL_ENTRY_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteJournalEntryFailAction implements Action {
  readonly type = DELETE_JOURNAL_ENTRY_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions =
  LoadJournalEntryAction |
  LoadJournalEntrySuccessAction |
  LoadJournalEntryFailAction |

  LoadJournalEntriesAction |
  LoadJournalEntriesSuccessAction |
  LoadJournalEntriesFailAction |

  AddJournalEntryAction |
  AddJournalEntrySuccessAction |
  AddJournalEntryFailAction |

  UpdateJournalEntryAction |
  UpdateJournalEntrySuccessAction |
  UpdateJournalEntryFailAction |

  DeleteJournalEntryAction |
  DeleteJournalEntrySuccessAction |
  DeleteJournalEntryFailAction;
