import {Injectable} from '@angular/core';

import {PartialOutcome} from "../../models/outcome";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {AddOutcomeAction, DeleteOutcomeAction, UpdateOutcomeAction} from "../../store/actions/office";

@Injectable()
export class OutcomeService {

  get outcomes$() {
    return this.store.select(fromRoot.getOutcomes);
  }

  get scopedOutcomes$() {
    return this.store.select(fromRoot.getScopedOutcomes);
  }

  constructor(private store: Store<fromRoot.State>) {
    console.log('Hello OutcomeService Provider');
  }

  getOutcomes$(query: PartialOutcome) {
    return this.outcomes$.map(outcomes => {
      return outcomes.filter(outcome => Object.keys(query).every(key => outcome[key] == query[key]));
    });
  }

  getOutcome$(query: PartialOutcome) {
    return this.outcomes$.map(outcomes => {
      return outcomes.find(outcome => Object.keys(query).every(key => outcome[key] == query[key]));
    });
  }

  addOutcome(outcome: PartialOutcome) {
    this.store.dispatch(new AddOutcomeAction(outcome));
  }

  deleteOutcome(id: string) {
    this.store.dispatch(new DeleteOutcomeAction(id));
  }

  updateOutcome(id: string, changes: PartialOutcome) {
    this.store.dispatch(new UpdateOutcomeAction({id, changes}));
  }
}
