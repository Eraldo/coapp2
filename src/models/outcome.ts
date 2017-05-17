import {Scope} from "./scope";
import {Status} from "./status";

export interface Step {
  id: string;
  name: string;
  done?: boolean;
  createdAt?: Date;
}

export interface Outcome {
  id: string;
  userId: string;
  name: string;
  inbox: boolean;
  status: Status;
  scope?: Scope;
  deadline?: Date;
  start?: Date;
  description?: string;
  steps?: Step[],
  createdAt?: Date;
}
