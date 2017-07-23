import * as office from '../actions/office';
import {Outcome, Step} from "../../models/outcome";
import {Focus} from "../../models/focus";


export interface State {
  outcomes: Outcome[];
  steps: Step[];
  focuses: Focus[];
  loading: boolean,
  loaded: boolean,
}

const initialState: State = {
  outcomes: [],
  steps: [],
  focuses: [],
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: office.Actions): State {
  switch (action.type) {
    case office.LOAD_OUTCOMES_SUCCESS: {
      const outcomes = action.payload;
      return {
        ...state,
        outcomes: outcomes.concat(state.outcomes.filter(outcome => !outcomes.find(d => d.id == outcome.id))),
        loaded: true
      };
    }

    case office.LOAD_OUTCOME_SUCCESS: {
      const loadedOutcome = action.payload;
      return {
        ...state,
        outcomes: [loadedOutcome, ...state.outcomes.filter(outcome => outcome.id != loadedOutcome.id)],
      };
    }

    case office.ADD_OUTCOME_SUCCESS: {
      const newOutcome = action.payload;
      return {
        ...state,
        outcomes: [newOutcome, ...state.outcomes],
      };
    }

    case office.UPDATE_OUTCOME_SUCCESS: {
      const updatedOutcome = action.payload;
      return {
        ...state,
        outcomes: [updatedOutcome, ...state.outcomes.filter(outcome => outcome.id != updatedOutcome.id)],
      };
    }

    case office.DELETE_OUTCOME_SUCCESS: {
      const deletedOutcomeId = action.payload;
      return {
        ...state,
        // outcomes without the loaded one
        outcomes: state.outcomes.filter(outcome => outcome.id != deletedOutcomeId),
      };
    }


    case office.LOAD_FOCUSES_SUCCESS: {
      const focuses = action.payload;
      return {
        ...state,
        focuses: focuses.concat(state.focuses.filter(focus => !focuses.find(d => d.id == focus.id))),
        loaded: true
      };
    }

    case office.LOAD_FOCUS_SUCCESS: {
      const loadedFocus = action.payload;
      return {
        ...state,
        focuses: [loadedFocus, ...state.focuses.filter(focus => focus.id != loadedFocus.id)],
      };
    }

    case office.ADD_FOCUS_SUCCESS: {
      const newFocus = action.payload;
      return {
        ...state,
        focuses: [newFocus, ...state.focuses],
      };
    }

    case office.UPDATE_FOCUS_SUCCESS: {
      const updatedFocus = action.payload;
      return {
        ...state,
        focuses: [updatedFocus, ...state.focuses.filter(focus => focus.id != updatedFocus.id)],
      };
    }

    case office.DELETE_FOCUS_SUCCESS: {
      const deletedFocusId = action.payload;
      return {
        ...state,
        focuses: state.focuses.filter(focus => focus.id != deletedFocusId),
      };
    }

    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const getOutcomes = (state: State) => state.outcomes;
export const getSteps = (state: State) => state.steps;
export const getFocuses = (state: State) => state.focuses;

