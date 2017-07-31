import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApiService} from "../api/api";
import {PartialJournalEntry, JournalEntry} from "../../models/journal";

@Injectable()
export class JournalEntryDataService {
  journalEntriesUrl = 'journal/';

  constructor(public http: Http, private apiService: ApiService) {
    console.log('Hello JournalEntryDataService Provider');
  }

  public createJournalEntry$(journalEntry: PartialJournalEntry): Observable<JournalEntry> {
    journalEntry = this.mapJournalEntryToApiJournalEntry(journalEntry);
    return this.apiService.post$(this.journalEntriesUrl, journalEntry)
      .map(journalEntry => this.mapApiJournalEntryToJournalEntry(journalEntry))
  }

  public getJournalEntries$(): Observable<any[]> {
    return this.apiService.get$(this.journalEntriesUrl)
      .map(response => response
        .map(journalEntry => this.mapApiJournalEntryToJournalEntry(journalEntry)))
  }

  public getJournalEntry$(id: string): Observable<JournalEntry> {
    return this.apiService.get$(id)
      .map(journalEntry => this.mapApiJournalEntryToJournalEntry(journalEntry))
      .catch(error => Observable.of(undefined));
  }

  public updateJournalEntry$(url: string, changes: PartialJournalEntry) {
    changes = this.mapJournalEntryToApiJournalEntry(changes);
    return this.apiService.patch$(url, changes)
      .map(journalEntry => this.mapApiJournalEntryToJournalEntry(journalEntry))
  }

  public deleteJournalEntry$(id: string) {
    return this.apiService.delete$(id)
  }

  private mapApiJournalEntryToJournalEntry(object): JournalEntry {
    const journalEntry = new JournalEntry({
      id: object.url,
      ownerId: object.owner,
      scope: object.scope,
      start: object.start,
      content: object.content,
      keywords: object.keywords,
      createdAt: object.created,
      modifiedAt: object.modified,
    });
    return journalEntry;
  }

  private mapJournalEntryToApiJournalEntry(object: PartialJournalEntry): Object {
    object = Object.assign({}, object);  // Making the object mutable
    if (object.hasOwnProperty('ownerId')) {
      object['owner'] = object.ownerId;
      delete object.ownerId;
    }
    return object;
  }
}
