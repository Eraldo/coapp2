import {Scope} from "./scope";
import {OpenStatuses, Status} from "./status";

export interface Step {
  id: string;
  outcome: string;
  name: string;
  done?: boolean;
  createdAt?: string;
}

export interface OutcomeObject {
  id: string;
  owner: string;
  name: string;
  description?: string;
  status: Status;
  inbox: boolean;
  scope?: Scope;
  start?: string;
  deadline?: string;
  isFocus?: boolean;
  createdAt?: string;
}

export type PartialOutcome = Partial<OutcomeObject>;

export class Outcome implements OutcomeObject {
  id: string;
  owner: string;
  name: string;
  description?: string;
  status: Status;
  inbox: boolean;
  scope?: Scope;
  start?: string;
  deadline?: string;
  isFocus?: boolean;
  createdAt?: string;

  constructor(outcomeObject: OutcomeObject) {
    Object.assign(this, outcomeObject);
  }

  search(query: string) {
    return this.name.search(query) != -1 ||
      this.description.search(query) != -1;
  }

  get isOpen() {
    return OpenStatuses.find(status => status == this.status)
  }

  get isClosed() {
    return !this.isOpen
  }
}
