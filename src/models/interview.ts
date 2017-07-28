import {getScopeEnd, Scope} from "./scope";

export interface InterviewEntryObject {
  id: string;
  ownerId: string;
  scope: Scope;
  start: string;
  likes: string;
  dislikes: string;
  createdAt?: string;
  modifiedAt?: string;
}

export type PartialInterviewEntry = Partial<InterviewEntryObject>;

export class InterviewEntry implements InterviewEntryObject {
  id: string;
  ownerId: string;
  scope: Scope;
  start: string;
  likes: string;
  dislikes: string;
  createdAt?: string;
  modifiedAt?: string;

  constructor(interviewEntryObject: InterviewEntryObject) {
    Object.assign(this, interviewEntryObject);
  }

  get end() {
    return getScopeEnd(this.scope, this.start);
  }

}
