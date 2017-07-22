import {Action} from '@ngrx/store';
import {PartialUser, User} from "../../models/user";

export const LOAD_USERS = '[Userss] Load users';
export const LOAD_USERS_SUCCESS = '[Userss] Load users success';
export const LOAD_USERS_FAIL = '[Userss] Load users fail';

export const LOAD_USER = '[Users] Load user';
export const LOAD_USER_SUCCESS = '[Users] Load user success';
export const LOAD_USER_FAIL = '[Users] Load user fail';

export const UPDATE_USER = '[Users] Update user';
export const UPDATE_USER_SUCCESS = '[Users] Update user success';
export const UPDATE_USER_FAIL = '[Users] Update user fail';

export const LOAD_TOKEN = '[Users] Load token';
export const LOAD_TOKEN_SUCCESS = '[Tokens] Load token success';
export const LOAD_TOKEN_FAIL = '[Tokens] Load token fail';

export const JOIN = '[Users] Join';
export const JOIN_SUCCESS = '[Users] Join success';
export const JOIN_FAIL = '[Users] Join fail';

export const LOGIN = '[Users] Login';
export const LOGIN_SUCCESS = '[Users] Login success';
export const LOGIN_FAIL = '[Users] Login fail';

export const LOGOUT = '[Users] Logout';
export const LOGOUT_SUCCESS = '[Users] Logout success';
export const LOGOUT_FAIL = '[Users] Logout fail';


export class LoadUserAction implements Action {
  readonly type = LOAD_USER;
}

export class LoadUserSuccessAction implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoadUserFailAction implements Action {
  readonly type = LOAD_USER_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadUsersAction implements Action {
  readonly type = LOAD_USERS;

  constructor(public payload: User) {
  }
}

export class LoadUsersSuccessAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadUsersFailAction implements Action {
  readonly type = LOAD_USERS_FAIL;

  constructor(public payload: string) {
  }
}


export class UpdateUserAction implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: PartialUser) {
  }
}

export class UpdateUserSuccessAction implements Action {
  readonly type = UPDATE_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateUserFailAction implements Action {
  readonly type = UPDATE_USER_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadTokenAction implements Action {
  readonly type = LOAD_TOKEN;
}

export class LoadTokenSuccessAction implements Action {
  readonly type = LOAD_TOKEN_SUCCESS;

  constructor(public payload: string) {
  }
}

export class LoadTokenFailAction implements Action {
  readonly type = LOAD_TOKEN_FAIL;

  constructor(public payload: string) {
  }
}


export interface JoinCredentials {
  email: string,
  password: string,
  username?: string
}

export class JoinAction implements Action {
  readonly type = JOIN;

  constructor(public payload: JoinCredentials) {
  }
}

export class JoinSuccessAction implements Action {
  readonly type = JOIN_SUCCESS;
}

export class JoinFailAction implements Action {
  readonly type = JOIN_FAIL;

  constructor(public payload: string) {
  }
}


export interface LoginCredentials {
  email: string,
  password: string
}

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginCredentials) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {
  }
}


export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS;
}

export class LogoutFailAction implements Action {
  readonly type = LOGOUT_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions =
  LoadUsersAction |
  LoadUsersSuccessAction |
  LoadUsersFailAction |

  LoadUserAction |
  LoadUserSuccessAction |
  LoadUserFailAction |

  UpdateUserAction |
  UpdateUserSuccessAction |
  UpdateUserFailAction |

  LoadTokenAction |
  LoadTokenSuccessAction |
  LoadTokenFailAction |

  JoinAction |
  JoinSuccessAction |
  JoinFailAction |

  LoginAction |
  LoginSuccessAction |
  LoginFailAction |

  LogoutAction |
  LogoutSuccessAction |
  LogoutFailAction;
