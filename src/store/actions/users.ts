import {Action} from '@ngrx/store';
import {User} from "../../models/user";

export const LOAD_USER = '[Users] Load user';
export const LOAD_USER_SUCCESS = '[Users] Load user success';
export const LOAD_USER_FAIL = '[Users] Load user fail';
export const LOAD_USERS = '[Userss] Load users';
export const LOAD_USERS_SUCCESS = '[Userss] Load users success';
export const LOAD_USERS_FAIL = '[Userss] Load users fail';
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

export interface LoginCredentials {email: string, password: string}

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
  LoadUserAction |
  LoadUserSuccessAction |
  LoadUserFailAction |
  LoadUsersAction |
  LoadUsersSuccessAction |
  LoadUsersFailAction |
  LoginAction |
  LoginSuccessAction |
  LoginFailAction;
