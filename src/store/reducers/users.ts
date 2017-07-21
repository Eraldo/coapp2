import * as users from '../actions/users';
import * as community from '../actions/community';
import {ANONYMOUS_USER, User} from "../../models/user";
import {createSelector} from "reselect/lib";


export interface State {
  currentUserId: string;
  users: User[];
}

const initialState: State = {
  currentUserId: '',
  users: [ANONYMOUS_USER],
};

export function reducer(state = initialState, action: users.Actions): State {
  switch (action.type) {
    case users.LOAD_USER_SUCCESS: {
      const loadedUser = action.payload;
      return {
        currentUserId: state.currentUserId,
        users: [loadedUser, ...state.users.filter(user => user.id != loadedUser.id)]
      };
    }

    case users.LOGIN_SUCCESS: {
      const loadedUser = action.payload;
      return {
        currentUserId: loadedUser.id,
        users: [loadedUser, ...state.users.filter(user => user.id != loadedUser.id)]
      };
    }

    default:
      return state;
  }
}

export const getUsers = (state: State) => state.users;
export const getCurrentUserId = (state: State) => state.currentUserId;

export const getCurrentUser = createSelector(getUsers, getCurrentUserId, (users, id) => {
  return users.filter(user => user.id === id)[0];
});
