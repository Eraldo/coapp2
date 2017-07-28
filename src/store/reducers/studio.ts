import * as studio from '../actions/studio';
import {JournalEntry} from "../../models/journal";
import {InterviewEntry} from "../../models/interview";


export interface State {
  journalEntries: JournalEntry[];
  interviewEntries: InterviewEntry[];
  loading: boolean,
  loaded: boolean,
}

const initialState: State = {
  journalEntries: [],
  interviewEntries: [],
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


    case studio.LOAD_INTERVIEW_ENTRIES_SUCCESS: {
      const interviewEntries = action.payload;
      return {
        ...state,
        interviewEntries: interviewEntries.concat(state.interviewEntries.filter(interviewEntry => !interviewEntries.find(d => d.id === interviewEntry.id))),
        loaded: true
      };
    }

    case studio.LOAD_INTERVIEW_ENTRY_SUCCESS: {
      const loadedInterviewEntry = action.payload;
      return {
        ...state,
        interviewEntries: [loadedInterviewEntry, ...state.interviewEntries.filter(interviewEntry => interviewEntry.id !== loadedInterviewEntry.id)],
      };
    }

    case studio.ADD_INTERVIEW_ENTRY_SUCCESS: {
      const newInterviewEntry = action.payload;
      return {
        ...state,
        interviewEntries: [newInterviewEntry, ...state.interviewEntries],
      };
    }

    case studio.UPDATE_INTERVIEW_ENTRY_SUCCESS: {
      const updatedInterviewEntry = action.payload;
      return {
        ...state,
        interviewEntries: [updatedInterviewEntry, ...state.interviewEntries.filter(interviewEntry => interviewEntry.id != updatedInterviewEntry.id)],
      };
    }

    case studio.DELETE_INTERVIEW_ENTRY_SUCCESS: {
      const deletedInterviewEntryId = action.payload;
      return {
        ...state,
        interviewEntries: state.interviewEntries.filter(interviewEntry => interviewEntry.id != deletedInterviewEntryId),
      };
    }

    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const getJournalEntries = (state: State) => state.journalEntries;
export const getInterviewEntries = (state: State) => state.interviewEntries;
