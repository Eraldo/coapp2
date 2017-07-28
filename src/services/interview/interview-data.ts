import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApiService} from "../api/api";
import {PartialInterviewEntry, InterviewEntry} from "../../models/interview";

@Injectable()
export class InterviewEntryDataService {
  interviewEntriesUrl = 'interviews/';

  constructor(public http: Http, private apiService: ApiService) {
    console.log('Hello InterviewEntryDataService Provider');
  }

  public createInterviewEntry$(interviewEntry: PartialInterviewEntry): Observable<InterviewEntry> {
    interviewEntry = this.mapInterviewEntryToApiInterviewEntry(interviewEntry);
    return this.apiService.post$(this.interviewEntriesUrl, interviewEntry)
      .map(interviewEntry => this.mapApiInterviewEntryToInterviewEntry(interviewEntry))
  }

  public getInterviewEntries$(): Observable<any[]> {
    return this.apiService.get$(this.interviewEntriesUrl)
      .map(response => response
        .map(interviewEntry => this.mapApiInterviewEntryToInterviewEntry(interviewEntry)))
  }

  public getInterviewEntry$(id: string): Observable<InterviewEntry> {
    return this.apiService.get$(id)
      .map(interviewEntry => this.mapApiInterviewEntryToInterviewEntry(interviewEntry))
      .catch(error => Observable.of(undefined));
  }

  public updateInterviewEntry$(url: string, changes: PartialInterviewEntry) {
    changes = this.mapInterviewEntryToApiInterviewEntry(changes);
    return this.apiService.patch$(url, changes)
      .map(interviewEntry => this.mapApiInterviewEntryToInterviewEntry(interviewEntry))
  }

  public deleteInterviewEntry$(id: string) {
    return this.apiService.delete$(id)
  }

  private mapApiInterviewEntryToInterviewEntry(object): InterviewEntry {
    const interviewEntry = new InterviewEntry({
      id: object.url,
      ownerId: object.owner,
      scope: object.scope,
      start: object.start,
      likes: object.likes,
      dislikes: object.dislikes,
      createdAt: object.created,
      modifiedAt: object.modified,
    });
    return interviewEntry;
  }

  private mapInterviewEntryToApiInterviewEntry(object: PartialInterviewEntry): Object {
    object = Object.assign({}, object);  // Making the object mutable
    if (object.hasOwnProperty('ownerId')) {
      object['owner'] = object.ownerId;
      delete object.ownerId;
    }
    return object;
  }
}
