import * as community from '../actions/community';
import {Duo} from "../../models/duo";
import {Clan} from "../../models/clan";
import {Tribe} from "../../models/tribe";


// function mergeByProperty(arr1, arr2, prop) {
//   _.each(arr2, function(arr2obj) {
//     var arr1obj = _.find(arr1, function(arr1obj) {
//       return arr1obj[prop] === arr2obj[prop];
//     });
//
//     arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
//   });
// }
//
// function mergeByProperty(arr1, arr2, prop) {
//   arr2.map(arr2obj => {
//     var arr1obj = arr1.find(arr1obj => {
//       return arr1obj[prop] === arr2obj[prop];
//     });
//
//     arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
//   });
// }

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
    case community.LOAD_DUOS:
      return state;

    case community.LOAD_DUOS_SUCCESS:
      const duos = action.payload;
      // return state;
      return {
        duos: duos.concat(state.duos.filter(duo => !duos.find(d => d.id == duo.id))),
        clans: state.clans,
        tribes: state.tribes
      };

    default:
      return state;
  }
}

export const getDuos = (state: State) => state.duos;
export const getClans = (state: State) => state.clans;
export const getTribes = (state: State) => state.tribes;
