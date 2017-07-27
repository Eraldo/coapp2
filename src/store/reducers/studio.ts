import * as studio from '../actions/studio';
import {JournalEntry} from "../../models/journal";


export interface State {
  journalEntries: JournalEntry[];
  loading: boolean,
  loaded: boolean,
}

const initialState: State = {
  journalEntries: [],
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: studio.Actions): State {
  switch (action.type) {
    case studio.LOAD_JOURNAL_ENTRIES_SUCCESS: {
      const journalEntries = action.payload;
      return {
        ...state,
        journalEntries: journalEntries.concat(state.journalEntries.filter(journalEntry => !journalEntries.find(d => d.id === journalEntry.id))),
        loaded: true
      };
    }

    case studio.LOAD_JOURNAL_ENTRY_SUCCESS: {
      const loadedJournalEntry = action.payload;
      return {
        ...state,
        journalEntries: [loadedJournalEntry, ...state.journalEntries.filter(journalEntry => journalEntry.id !== loadedJournalEntry.id)],
      };
    }

    case studio.ADD_JOURNAL_ENTRY_SUCCESS: {
      const newJournalEntry = action.payload;
      return {
        ...state,
        journalEntries: [newJournalEntry, ...state.journalEntries],
      };
    }

    case studio.UPDATE_JOURNAL_ENTRY_SUCCESS: {
      const updatedJournalEntry = action.payload;
      return {
        ...state,
        journalEntries: [updatedJournalEntry, ...state.journalEntries.filter(journalEntry => journalEntry.id != updatedJournalEntry.id)],
      };
    }

    case studio.DELETE_JOURNAL_ENTRY_SUCCESS: {
      const deletedJournalEntryId = action.payload;
      return {
        ...state,
        journalEntries: state.journalEntries.filter(journalEntry => journalEntry.id != deletedJournalEntryId),
      };
    }

    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const getJournalEntries = (state: State) => state.journalEntries;
