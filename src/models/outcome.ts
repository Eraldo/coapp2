import {Scope} from "./scope";
import {Status} from "./status";

export interface Step {
  id: string;
  name: string;
  done?: boolean;
  createdAt?: string;
}

export interface OutcomeObject {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: Status;
  inbox: boolean;
  scope?: Scope;
  start?: string;
  deadline?: string;
  createdAt?: string;
}

export class Outcome implements OutcomeObject {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: Status;
  inbox: boolean;
  scope?: Scope;
  start?: string;
  deadline?: string;
  createdAt?: string;

  constructor(outcomeObject: OutcomeObject) {
    Object.assign(this, outcomeObject);
  }
}
