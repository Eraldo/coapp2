import * as users from '../actions/users';
import {ANONYMOUS_USER, User} from "../../models/user";
import {createSelector} from "reselect/lib";


export interface State {
  token: string,
  currentUserId: string;
  users: User[];
  loading: boolean,
  loaded: boolean,
}

const initialState: State = {
  token: '',
  currentUserId: '',
  users: [],
  loading: false,
  loaded: false,
};

export function reducer(state = initialState, action: users.Actions): State {
  switch (action.type) {

    case users.LOAD_USER_SUCCESS: {
      const loadedUser = action.payload;
      return {
        ...state,
        users: [loadedUser, ...state.users.filter(user => user.id != loadedUser.id)]
      };
    }

    case users.LOAD_USERS_SUCCESS: {
      const loadedUsers = action.payload;
      return {
        ...state,
        // Replace all users except the current user.
        users: [
          ...state.users.filter(user => user.id == state.currentUserId || !loadedUsers.find(u => u.id == user.id)),
          ...loadedUsers.filter(user => user.id != state.currentUserId)
        ],
        loaded: true
      };
    }

    case users.LOAD_TOKEN: {
      return {
        ...state,
        loading: true
      };
    }

    case users.LOAD_TOKEN_SUCCESS: {
      const token = action.payload;
      return {
        ...state,
        token: token,
        loading: false
      };
    }

    case users.LOAD_TOKEN_FAIL: {
      return {
        ...state,
        loading: false
      };
    }

    case users.JOIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case users.JOIN_SUCCESS:
    case users.JOIN_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    case users.LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }

    case users.LOGIN_SUCCESS: {
      const loadedUser = action.payload;
      return {
        ...state,
        currentUserId: loadedUser.id,
        users: [loadedUser, ...state.users.filter(user => user.id != loadedUser.id)],
        loading: false
      };
    }

    case users.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    case users.LOGOUT: {
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

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const getToken = (state: State) => state.token;
export const getUsers = (state: State) => state.users;
export const getCurrentUserId = (state: State) => state.currentUserId;

export const getCurrentUser = createSelector(getUsers, getCurrentUserId, (users, id) => {
  return users.filter(user => user.id === id)[0] || ANONYMOUS_USER;
});
export const getAuthenticated = createSelector(getToken, token => !!token);
