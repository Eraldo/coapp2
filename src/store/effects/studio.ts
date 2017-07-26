import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {JournalEntryDataService} from "../../services/journal/journal-data";
import {
  LOAD_JOURNAL_ENTRY, LoadJournalEntrySuccessAction, LoadJournalEntryFailAction,
  LOAD_JOURNAL_ENTRIES, LoadJournalEntriesSuccessAction, LoadJournalEntriesFailAction,
  ADD_JOURNAL_ENTRY, AddJournalEntryFailAction, AddJournalEntrySuccessAction,
  UPDATE_JOURNAL_ENTRY, UpdateJournalEntrySuccessAction, UpdateJournalEntryFailAction, UpdateJournalEntryActionPayload,
  DELETE_JOURNAL_ENTRY, DeleteJournalEntrySuccessAction, DeleteJournalEntryFailAction
} from "../actions/studio";
import {LOGIN_SUCCESS} from "../actions/users";

@Injectable()
export class StudioEffects {

  constructor(private actions$: Actions, private journalEntryDataService: JournalEntryDataService) {
  }

  @Effect()
  loadJournalEntries$: Observable<Action> = this.actions$
    .ofType(LOAD_JOURNAL_ENTRIES, LOGIN_SUCCESS)
    .switchMap(() =>
      this.journalEntryDataService.getJournalEntries$()
        .map((journalEntries) => new LoadJournalEntriesSuccessAction(journalEntries))
        .catch(error => Observable.of(new LoadJournalEntriesFailAction(error)))
    );

  @Effect()
  loadJournalEntry$: Observable<Action> = this.actions$
    .ofType(LOAD_JOURNAL_ENTRY)
    .map(toPayload)
    .switchMap(id =>
      this.journalEntryDataService.getJournalEntry$(id)
        .map(journalEntry => new LoadJournalEntrySuccessAction(journalEntry))
        .catch(error => Observable.of(new LoadJournalEntryFailAction(error)))
    );

  @Effect()
  addJournalEntry$: Observable<Action> = this.actions$
    .ofType(ADD_JOURNAL_ENTRY)
    .map(toPayload)
    .switchMap(journalEntry =>
      this.journalEntryDataService.createJournalEntry$(journalEntry)
        .map(journalEntry => new AddJournalEntrySuccessAction(journalEntry))
        .catch(error => Observable.of(new AddJournalEntryFailAction(error)))
    );

  @Effect()
  updateJournalEntry$: Observable<Action> = this.actions$
    .ofType(UPDATE_JOURNAL_ENTRY)
    .map(toPayload)
    .switchMap((payload: UpdateJournalEntryActionPayload) =>
      this.journalEntryDataService.updateJournalEntry$(payload.id, payload.changes)
        .map(journalEntry => new UpdateJournalEntrySuccessAction(journalEntry))
        .catch(error => Observable.of(new UpdateJournalEntryFailAction(error)))
    );

  @Effect()
  deleteJournalEntry$: Observable<Action> = this.actions$
    .ofType(DELETE_JOURNAL_ENTRY)
    .map(toPayload)
    .switchMap(id =>
      this.journalEntryDataService.deleteJournalEntry$(id)
        .map(() => new DeleteJournalEntrySuccessAction(id))
        .catch(error => Observable.of(new DeleteJournalEntryFailAction(error)))
    );
  quitJournalEntry$: Observable<Action> = this.actions$
}
