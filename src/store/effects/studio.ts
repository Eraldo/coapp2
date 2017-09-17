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

import {InterviewEntryDataService} from "../../services/interview/interview-data";
import {
  LOAD_INTERVIEW_ENTRY, LoadInterviewEntrySuccessAction, LoadInterviewEntryFailAction,
  LOAD_INTERVIEW_ENTRIES, LoadInterviewEntriesSuccessAction, LoadInterviewEntriesFailAction,
  ADD_INTERVIEW_ENTRY, AddInterviewEntryFailAction, AddInterviewEntrySuccessAction,
  UPDATE_INTERVIEW_ENTRY, UpdateInterviewEntrySuccessAction, UpdateInterviewEntryFailAction, UpdateInterviewEntryActionPayload,
  DELETE_INTERVIEW_ENTRY, DeleteInterviewEntrySuccessAction, DeleteInterviewEntryFailAction
} from "../actions/studio";

import {LoadExperienceAction} from "../actions/experience";
import {App} from "../../models/app";

@Injectable()
export class StudioEffects {

  constructor(private actions$: Actions, private journalEntryDataService: JournalEntryDataService, private interviewEntryDataService: InterviewEntryDataService) {
  }

  @Effect()
  loadJournalEntries$: Observable<Action> = this.actions$
    .ofType(LOAD_JOURNAL_ENTRIES)
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
        .mergeMap(journalEntry => [
          new AddJournalEntrySuccessAction(journalEntry),
          new LoadExperienceAction({app: App.studio})
        ])
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


  @Effect()
  loadInterviewEntries$: Observable<Action> = this.actions$
    .ofType(LOAD_INTERVIEW_ENTRIES)
    .switchMap(() =>
      this.interviewEntryDataService.getInterviewEntries$()
        .map((interviewEntries) => new LoadInterviewEntriesSuccessAction(interviewEntries))
        .catch(error => Observable.of(new LoadInterviewEntriesFailAction(error)))
    );

  @Effect()
  loadInterviewEntry$: Observable<Action> = this.actions$
    .ofType(LOAD_INTERVIEW_ENTRY)
    .map(toPayload)
    .switchMap(id =>
      this.interviewEntryDataService.getInterviewEntry$(id)
        .map(interviewEntry => new LoadInterviewEntrySuccessAction(interviewEntry))
        .catch(error => Observable.of(new LoadInterviewEntryFailAction(error)))
    );

  @Effect()
  addInterviewEntry$: Observable<Action> = this.actions$
    .ofType(ADD_INTERVIEW_ENTRY)
    .map(toPayload)
    .switchMap(interviewEntry =>
      this.interviewEntryDataService.createInterviewEntry$(interviewEntry)
        .mergeMap(interviewEntry => [
          new AddInterviewEntrySuccessAction(interviewEntry),
          new LoadExperienceAction({app: App.studio})
        ])
        .catch(error => Observable.of(new AddInterviewEntryFailAction(error)))
    );

  @Effect()
  updateInterviewEntry$: Observable<Action> = this.actions$
    .ofType(UPDATE_INTERVIEW_ENTRY)
    .map(toPayload)
    .switchMap((payload: UpdateInterviewEntryActionPayload) =>
      this.interviewEntryDataService.updateInterviewEntry$(payload.id, payload.changes)
        .map(interviewEntry => new UpdateInterviewEntrySuccessAction(interviewEntry))
        .catch(error => Observable.of(new UpdateInterviewEntryFailAction(error)))
    );

  @Effect()
  deleteInterviewEntry$: Observable<Action> = this.actions$
    .ofType(DELETE_INTERVIEW_ENTRY)
    .map(toPayload)
    .switchMap(id =>
      this.interviewEntryDataService.deleteInterviewEntry$(id)
        .map(() => new DeleteInterviewEntrySuccessAction(id))
        .catch(error => Observable.of(new DeleteInterviewEntryFailAction(error)))
    );
}
