import {Scope} from "./scope";
import moment from "moment";

export interface FocusObject {
  id: string;
  owner: string;
  scope: Scope;
  start: string;
  outcome1: string;
  outcome2: string;
  outcome3: string;
  outcome4: string;
  createdAt?: string;
  modifiedAt?: string;
}

export type PartialFocus = Partial<FocusObject>;

export class Focus implements FocusObject {
  id: string;
  owner: string;
  scope: Scope;
  start: string;
  outcome1: string;
  outcome2: string;
  outcome3: string;
  outcome4: string;
  createdAt?: string;
  modifiedAt?: string;

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

  includesDate(date: string) {
    return moment(date).isBetween(moment(this.start), moment(this.end), 'days', '[]') // all inclusive
  }

  get isEditable() {
    return moment().isBetween(moment(this.start), moment(this.end), 'days', '[]') // all inclusive
  }
}
