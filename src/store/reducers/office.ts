import * as office from '../actions/office';
import {Outcome, Step} from "../../models/outcome";
import {Focus} from "../../models/focus";


export interface State {
  outcomes: Outcome[];
  steps: Step[];
  focuses: Focus[];
}

const initialState: State = {
  outcomes: [],
  steps: [],
  focuses: [],
};

export function reducer(state = initialState, action: office.Actions): State {
  switch (action.type) {
    case office.LOAD_OUTCOMES_SUCCESS: {
      const outcomes = action.payload;
      return {
        outcomes: outcomes.concat(state.outcomes.filter(outcome => !outcomes.find(d => d.id == outcome.id))),
        steps: state.steps,
        focuses: state.focuses
      };
    }

    case office.LOAD_OUTCOME_SUCCESS: {
      const loadedOutcome = action.payload;
      // outcomes without the loaded one
      let outcomes = state.outcomes.filter(outcome => outcome.id != loadedOutcome.id);
      // adding the loaded outcome
      outcomes.unshift(loadedOutcome);
      return {
        outcomes: outcomes,
        steps: state.steps,
        focuses: state.focuses
      };
    }

    case office.UPDATE_OUTCOME_SUCCESS: {
      const updatedOutcome = action.payload;
      return {
        outcomes: [updatedOutcome, ...state.outcomes.filter(outcome => outcome.id != updatedOutcome.id)],
        steps: state.steps,
        focuses: state.focuses
      };
    }

    case office.DELETE_OUTCOME_SUCCESS: {
      const deletedOutcomeId = action.payload;
      return {
        // outcomes without the loaded one
        outcomes: state.outcomes.filter(outcome => outcome.id != deletedOutcomeId),
        steps: state.steps,
        focuses: state.focuses
      };
    }

    default:
      return state;
  }
}

export const getOutcomes = (state: State) => state.outcomes;
export const getSteps = (state: State) => state.steps;
export const getFocuses = (state: State) => state.focuses;
