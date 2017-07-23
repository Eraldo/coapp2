import {Actions, SET_DATE} from "../actions/date";
import moment from "moment";


export interface State {
  currentDate: string;
}

const initialState: State = {
  currentDate: moment().format('YYYY-MM-DD'),
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case SET_DATE: {
      const date = action.payload;
      return {
        ...state,
        currentDate: date
      };
    }

    default:
      return state;
  }
}

export const getDate = (state: State) => state.currentDate;
