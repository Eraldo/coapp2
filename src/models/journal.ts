import {Scope} from "./scope";
import moment from "moment";

export interface JournalEntryObject {
  id: string;
  ownerId: string;
  scope: Scope;
  start: string;
  content: string;
  keywords: string;
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
  keywords: string;
  createdAt?: string;
  modifiedAt?: string;

  constructor(journalEntryObject: JournalEntryObject) {
    Object.assign(this, journalEntryObject);
  }

  get end() {
    switch (this.scope) {
      case Scope.DAY: {
        return this.start
      }
      case  Scope.WEEK: {
        return moment(this.start).add(6, 'days').format('YYYY-MM-DD')
      }
      case  Scope.MONTH: {
        return moment(this.start).endOf('month').format('YYYY-MM-DD')
      }
      case  Scope.YEAR: {
        return moment(this.start).endOf('year').format('YYYY-MM-DD')
      }
    }
  }

}
