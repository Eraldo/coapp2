import * as users from '../actions/users';
import * as community from '../actions/community';
import {ANONYMOUS_USER, User} from "../../models/user";
import {createSelector} from "reselect/lib";


export interface State {
  token: string,
  currentUserId: string;
  users: User[];
}

const initialState: State = {
  token: '',
  currentUserId: '',
  users: [],
};

export function reducer(state = initialState, action: users.Actions): State {
  switch (action.type) {
    case users.LOAD_TOKEN_SUCCESS: {
      const token = action.payload;
      return {
        ...state,
        token: token
      };
    }

    case users.LOAD_USER_SUCCESS: {
      const loadedUser = action.payload;
      return {
        ...state,
        users: [loadedUser, ...state.users.filter(user => user.id != loadedUser.id)]
      };
    }

    case users.LOGIN_SUCCESS: {
      const loadedUser = action.payload;
      return {
        ...state,
        currentUserId: loadedUser.id,
        users: [loadedUser, ...state.users.filter(user => user.id != loadedUser.id)]
      };
    }

    case users.LOGOUT_SUCCESS: {
      return {
        ...state,
        token: '',
        currentUserId: ''
      };
    }

    default:
      return state;
  }
}

export const getToken = (state: State) => state.token;
export const getUsers = (state: State) => state.users;
export const getCurrentUserId = (state: State) => state.currentUserId;

export const getCurrentUser = createSelector(getUsers, getCurrentUserId, (users, id) => {
  return users.filter(user => user.id === id)[0] || ANONYMOUS_USER;
});
