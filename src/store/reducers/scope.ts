import {Scope} from "../../models/scope";
import {Actions, SET_SCOPE} from "../actions/scope";


export interface State {
  currentScope: Scope;
}

const initialState: State = {
  currentScope: Scope.DAY,
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case SET_SCOPE: {
      const scope = action.payload;
      return {
        ...state,
        currentScope: scope
      };
    }

    default:
      return state;
  }
}

export const getScope = (state: State) => state.currentScope;
