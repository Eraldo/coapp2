import {Scope} from "./scope";
import {Status} from "./status";

export interface Step {
  id: string;
  name: string;
  done?: boolean;
  createdAt?: string;
}

export interface Outcome {
  id: string;
  userId: string;
  name: string;
  inbox: boolean;
  status: Status;
  scope?: Scope;
  deadline?: string;
  start?: string;
  description?: string;
  steps?: Step[],
  createdAt?: string;
}
