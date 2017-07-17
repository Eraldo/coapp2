import * as community from '../actions/community';
import {Duo} from "../../models/duo";
import {Clan} from "../../models/clan";
import {Tribe} from "../../models/tribe";


export interface State {
  duos: Duo[];
  clans: Clan[];
  tribes: Tribe[];
}

const initialState: State = {
  duos: [],
  clans: [],
  tribes: [],
};

export function reducer(state = initialState, action: community.Actions): State {
  switch (action.type) {
    case community.LOAD_DUOS_SUCCESS: {
      const duos = action.payload;
      return {
        duos: duos.concat(state.duos.filter(duo => !duos.find(d => d.id == duo.id))),
        clans: state.clans,
        tribes: state.tribes
      };
    }

    case community.LOAD_DUO_SUCCESS: {
      const loadedDuo = action.payload;
      // duos without the loaded one
      let duos = state.duos.filter(duo => duo.id != loadedDuo.id);
      // adding the loaded duo
      duos.unshift(loadedDuo);
      return {
        duos: duos,
        clans: state.clans,
        tribes: state.tribes
      };
    }

    default:
      return state;
  }
}

export const getDuos = (state: State) => state.duos;
export const getClans = (state: State) => state.clans;
export const getTribes = (state: State) => state.tribes;
