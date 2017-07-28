import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Scope} from "../../models/scope";
import {InterviewEntry, PartialInterviewEntry} from "../../models/interview";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {AddInterviewEntryAction, UpdateInterviewEntryAction} from "../../store/actions/studio";

@Injectable()
export class InterviewService {

  get entries$() {
    return this.store.select(fromRoot.getInterviewEntries);
  }

  get entry$() {
    return this.store.select(fromRoot.getCurrentInterviewEntry);
  }

  constructor(public http: Http, private store: Store<fromRoot.State>) {
    console.log('Hello InterviewService Provider');
  }

  public getEntries$(scope: Scope, start: string): Observable<InterviewEntry[]> {
    return this.entries$.map(entries =>
      entries.filter(entry => entry.scope == scope && entry.start == start))
  }

  public getEntry$(query: PartialInterviewEntry): Observable<InterviewEntry> {
    return this.entries$.map(entries => {
      return entries.find(entry => Object.keys(query).every(key => entry[key] == query[key]));
    });
  }

  public addEntry(entry: PartialInterviewEntry) {
    this.store.dispatch(new AddInterviewEntryAction(entry));
  }

  public updateEntry(id: string, changes: PartialInterviewEntry) {
    this.store.dispatch(new UpdateInterviewEntryAction({id, changes}));
  }
}
