import * as community from '../actions/community';
import {Duo} from "../../models/duo";
import {Clan} from "../../models/clan";
import {Tribe} from "../../models/tribe";


export interface State {
  duos: Duo[];
  clans: Clan[];
  tribes: Tribe[];
  loading: boolean,
  loaded: boolean,
}

const initialState: State = {
  duos: [],
  clans: [],
  tribes: [],
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: community.Actions): State {
  switch (action.type) {
    case community.LOAD_DUOS_SUCCESS: {
      const duos = action.payload;
      return {
        ...state,
        duos: duos.concat(state.duos.filter(duo => !duos.find(d => d.id === duo.id))),
      };
    }

    case community.LOAD_DUO_SUCCESS: {
      const loadedDuo = action.payload;
      // duos without the loaded one
      let duos = state.duos.filter(duo => duo.id !== loadedDuo.id);
      // adding the loaded duo
      duos.unshift(loadedDuo);
      return {
        ...state,
        duos: duos,
      };
    }

    case community.JOIN_DUO_SUCCESS: {
      const userId = action.payload.userId;
      const duoId = action.payload.duoId;
      return {
        ...state,
        duos: state.duos.map(duo => {
          if (duo.id != duoId) {
            return duo
          } else {
            let newDuo = new Duo(duo);
            newDuo.members = [...duo.members, userId];
            return newDuo;
          }
        }),
      };
    }

    case community.QUIT_DUO_SUCCESS: {
      const userId = action.payload.userId;
      const duoId = action.payload.duoId;
      return {
        ...state,
        duos: state.duos.map(duo => {
          if (duo.id != duoId) {
            return duo
          } else {
            let newDuo = new Duo(duo);
            newDuo.members = duo.members.filter(member => member !== userId);
            return newDuo;
          }
        }),
      };
    }

    default:
      return state;
  }
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const getDuos = (state: State) => state.duos;
export const getClans = (state: State) => state.clans;
export const getTribes = (state: State) => state.tribes;
