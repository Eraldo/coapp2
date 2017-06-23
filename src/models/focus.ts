import {Scope} from "./scope";

export interface FocusObject {
  id: string;
  owner: string;
  scope: Scope;
  start: Date;
  outcome1: string;
  outcome2: string;
  outcome3: string;
  outcome4: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export class Focus implements FocusObject {
  id: string;
  owner: string;
  scope: Scope;
  start: Date;
  outcome1: string;
  outcome2: string;
  outcome3: string;
  outcome4: string;
  createdAt?: Date;
  modifiedAt?: Date;

  constructor(focusObject: FocusObject) {
    Object.assign(this, focusObject);
  }

  get outcomes() {
    return [
      this.outcome1,
      this.outcome2,
      this.outcome3,
      this.outcome4,
    ]
  }
}
