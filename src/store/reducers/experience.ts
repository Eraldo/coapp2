import {Actions, LOAD_EXPERIENCE_SUCCESS} from "../actions/experience";
import {ExperienceObject} from "../../models/experience";

export interface State {
  app: ExperienceObject;
  arcade: ExperienceObject;
  office: ExperienceObject;
  community: ExperienceObject;
  studio: ExperienceObject;
  academy: ExperienceObject;
  journey: ExperienceObject;
}
const INITIAL_EXPERIENCE: ExperienceObject = {experience: 0, level: 0, next: 0};

const initialState: State = {
  app: INITIAL_EXPERIENCE,
  arcade: INITIAL_EXPERIENCE,
  office: INITIAL_EXPERIENCE,
  community: INITIAL_EXPERIENCE,
  studio: INITIAL_EXPERIENCE,
  academy: INITIAL_EXPERIENCE,
  journey: INITIAL_EXPERIENCE
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case LOAD_EXPERIENCE_SUCCESS: {
      const app = action.payload.app;
      const experience = action.payload.status;
      return {
        ...state,
        [app]: experience
      };
    }

    default:
      return state;
  }
}

export const getExperience = (state: State) => state;
