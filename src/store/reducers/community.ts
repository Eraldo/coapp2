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
        loaded: true
      };
    }

    case community.LOAD_DUO_SUCCESS: {
      const loadedDuo = action.payload;
      return {
        ...state,
        duos: [loadedDuo, ...state.duos.filter(duo => duo.id !== loadedDuo.id)],
      };
    }

    case community.DELETE_DUO_SUCCESS: {
      const deletedDuoId = action.payload;
      return {
        ...state,
        duos: state.duos.filter(duo => duo.id != deletedDuoId),
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


    case community.LOAD_CLANS_SUCCESS: {
      const clans = action.payload;
      return {
        ...state,
        clans: clans.concat(state.clans.filter(clan => !clans.find(d => d.id === clan.id))),
        loaded: true
      };
    }

    case community.LOAD_CLAN_SUCCESS: {
      const loadedClan = action.payload;
      return {
        ...state,
        clans: [loadedClan, ...state.clans.filter(clan => clan.id !== loadedClan.id)],
      };
    }

    case community.DELETE_CLAN_SUCCESS: {
      const deletedClanId = action.payload;
      return {
        ...state,
        clans: state.clans.filter(clan => clan.id != deletedClanId),
      };
    }

    case community.JOIN_CLAN_SUCCESS: {
      const userId = action.payload.userId;
      const clanId = action.payload.clanId;
      return {
        ...state,
        clans: state.clans.map(clan => {
          if (clan.id != clanId) {
            return clan
          } else {
            let newClan = new Clan(clan);
            newClan.members = [...clan.members, userId];
            return newClan;
          }
        }),
      };
    }

    case community.QUIT_CLAN_SUCCESS: {
      const userId = action.payload.userId;
      const clanId = action.payload.clanId;
      return {
        ...state,
        clans: state.clans.map(clan => {
          if (clan.id != clanId) {
            return clan
          } else {
            let newClan = new Clan(clan);
            newClan.members = clan.members.filter(member => member !== userId);
            return newClan;
          }
        }),
      };
    }


    case community.LOAD_TRIBES_SUCCESS: {
      const tribes = action.payload;
      return {
        ...state,
        tribes: tribes.concat(state.tribes.filter(tribe => !tribes.find(d => d.id === tribe.id))),
        loaded: true
      };
    }

    case community.LOAD_TRIBE_SUCCESS: {
      const loadedTribe = action.payload;
      return {
        ...state,
        tribes: [loadedTribe, ...state.tribes.filter(tribe => tribe.id !== loadedTribe.id)],
      };
    }

    case community.DELETE_TRIBE_SUCCESS: {
      const deletedTribeId = action.payload;
      return {
        ...state,
        tribes: state.tribes.filter(tribe => tribe.id != deletedTribeId),
      };
    }

    case community.JOIN_TRIBE_SUCCESS: {
      const userId = action.payload.userId;
      const tribeId = action.payload.tribeId;
      return {
        ...state,
        tribes: state.tribes.map(tribe => {
          if (tribe.id != tribeId) {
            return tribe
          } else {
            let newTribe = new Tribe(tribe);
            newTribe.members = [...tribe.members, userId];
            return newTribe;
          }
        }),
      };
    }

    case community.QUIT_TRIBE_SUCCESS: {
      const userId = action.payload.userId;
      const tribeId = action.payload.tribeId;
      return {
        ...state,
        tribes: state.tribes.map(tribe => {
          if (tribe.id != tribeId) {
            return tribe
          } else {
            let newTribe = new Tribe(tribe);
            newTribe.members = tribe.members.filter(member => member !== userId);
            return newTribe;
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
