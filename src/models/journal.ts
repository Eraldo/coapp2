import {Scope} from "./scope";

export interface JournalEntryObject {
  id: string;
  ownerId: string;
  scope: Scope;
  start: string;
  content: string;
  createdAt?: string;
  modifiedAt?: string;
}

export type PartialJournalEntry = Partial<JournalEntryObject>;

export class JournalEntry implements JournalEntryObject {
  id: string;
  ownerId: string;
  scope: Scope;
  start: string;
  content: string;
  createdAt?: string;
  modifiedAt?: string;

  constructor(journalEntryObject: JournalEntryObject) {
    Object.assign(this, journalEntryObject);
  }
}
