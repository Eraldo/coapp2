import {Action} from '@ngrx/store';
import {JournalEntry, PartialJournalEntry} from "../../models/journal";
import {InterviewEntry, PartialInterviewEntry} from "../../models/interview";

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


export const LOAD_INTERVIEW_ENTRY = '[Interview] Load interview entry';
export const LOAD_INTERVIEW_ENTRY_SUCCESS = '[Interview] Load interview entry success';
export const LOAD_INTERVIEW_ENTRY_FAIL = '[Interview] Load interview entry fail';

export const LOAD_INTERVIEW_ENTRIES = '[Interview] Load interview entries';
export const LOAD_INTERVIEW_ENTRIES_SUCCESS = '[Interview] Load interview entries success';
export const LOAD_INTERVIEW_ENTRIES_FAIL = '[Interview] Load interview entries fail';

export const ADD_INTERVIEW_ENTRY = '[Interview] Add interview entry';
export const ADD_INTERVIEW_ENTRY_SUCCESS = '[Interview] Add interview entry success';
export const ADD_INTERVIEW_ENTRY_FAIL = '[Interview] Add interview entry fail';

export const UPDATE_INTERVIEW_ENTRY = '[Interview] Update interview entry';
export const UPDATE_INTERVIEW_ENTRY_SUCCESS = '[Interview] Update interview entry success';
export const UPDATE_INTERVIEW_ENTRY_FAIL = '[Interview] Update interview entry fail';

export const DELETE_INTERVIEW_ENTRY = '[Interview] Delete interview entry';
export const DELETE_INTERVIEW_ENTRY_SUCCESS = '[Interview] Delete interview entry success';
export const DELETE_INTERVIEW_ENTRY_FAIL = '[Interview] Delete interview entry fail';


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


export class LoadInterviewEntryAction implements Action {
  readonly type = LOAD_INTERVIEW_ENTRY;

  constructor(public payload: string) {
  }
}

export class LoadInterviewEntrySuccessAction implements Action {
  readonly type = LOAD_INTERVIEW_ENTRY_SUCCESS;

  constructor(public payload: InterviewEntry) {
  }
}

export class LoadInterviewEntryFailAction implements Action {
  readonly type = LOAD_INTERVIEW_ENTRY_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadInterviewEntriesAction implements Action {
  readonly type = LOAD_INTERVIEW_ENTRIES;
}

export class LoadInterviewEntriesSuccessAction implements Action {
  readonly type = LOAD_INTERVIEW_ENTRIES_SUCCESS;

  constructor(public payload: InterviewEntry[]) {
  }
}

export class LoadInterviewEntriesFailAction implements Action {
  readonly type = LOAD_INTERVIEW_ENTRIES_FAIL;

  constructor(public payload: string) {
  }
}


export class AddInterviewEntryAction implements Action {
  readonly type = ADD_INTERVIEW_ENTRY;

  constructor(public payload: PartialInterviewEntry) {
  }
}

export class AddInterviewEntrySuccessAction implements Action {
  readonly type = ADD_INTERVIEW_ENTRY_SUCCESS;

  constructor(public payload: InterviewEntry) {
  }
}

export class AddInterviewEntryFailAction implements Action {
  readonly type = ADD_INTERVIEW_ENTRY_FAIL;

  constructor(public payload: string) {
  }
}


export interface UpdateInterviewEntryActionPayload {
  id: string,
  changes: PartialInterviewEntry
}

export class UpdateInterviewEntryAction implements Action {
  readonly type = UPDATE_INTERVIEW_ENTRY;

  constructor(public payload: UpdateInterviewEntryActionPayload) {
  }
}

export class UpdateInterviewEntrySuccessAction implements Action {
  readonly type = UPDATE_INTERVIEW_ENTRY_SUCCESS;

  constructor(public payload: InterviewEntry) {
  }
}

export class UpdateInterviewEntryFailAction implements Action {
  readonly type = UPDATE_INTERVIEW_ENTRY_FAIL;

  constructor(public payload: string) {
  }
}


export class DeleteInterviewEntryAction implements Action {
  readonly type = DELETE_INTERVIEW_ENTRY;

  constructor(public payload: string) {
  }
}

export class DeleteInterviewEntrySuccessAction implements Action {
  readonly type = DELETE_INTERVIEW_ENTRY_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteInterviewEntryFailAction implements Action {
  readonly type = DELETE_INTERVIEW_ENTRY_FAIL;

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
  DeleteJournalEntryFailAction |


  LoadInterviewEntryAction |
  LoadInterviewEntrySuccessAction |
  LoadInterviewEntryFailAction |

  LoadInterviewEntriesAction |
  LoadInterviewEntriesSuccessAction |
  LoadInterviewEntriesFailAction |

  AddInterviewEntryAction |
  AddInterviewEntrySuccessAction |
  AddInterviewEntryFailAction |

  UpdateInterviewEntryAction |
  UpdateInterviewEntrySuccessAction |
  UpdateInterviewEntryFailAction |

  DeleteInterviewEntryAction |
  DeleteInterviewEntrySuccessAction |
  DeleteInterviewEntryFailAction;
