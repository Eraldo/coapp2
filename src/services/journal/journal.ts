import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Scope} from "../../models/scope";
import {JournalEntry, PartialJournalEntry} from "../../models/journal";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {AddJournalEntryAction, UpdateJournalEntryAction} from "../../store/actions/studio";

@Injectable()
export class JournalService {

  get entries$() {
    return this.store.select(fromRoot.getJournalEntries);
  }

  get entry$() {
    return this.store.select(fromRoot.getCurrentJournalEntry);
  }

  constructor(public http: Http, private store: Store<fromRoot.State>) {
    console.log('Hello JournalService Provider');
  }

  public getEntries$(scope: Scope, start: string): Observable<JournalEntry[]> {
    return this.entries$.map(entries =>
      entries.filter(entry => entry.scope == scope && entry.start == start))
  }

  public getEntry$(scope: Scope, start: string): Observable<JournalEntry> {
    return this.entries$.map(entries =>
      entries.find(entry => entry.scope == scope && entry.start == start))
  }

  public addEntry(entry: PartialJournalEntry) {
    this.store.dispatch(new AddJournalEntryAction(entry));
  }

  public updateEntry(id: string, changes: PartialJournalEntry) {
    this.store.dispatch(new UpdateJournalEntryAction({id, changes}));
  }
}
