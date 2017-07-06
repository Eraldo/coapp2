import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ApiService} from "../api/api";

@Injectable()
export class EmailService {
  messagesUrl = 'messages/';

  constructor(private apiService: ApiService) {
    console.log('Hello EmailService Provider');
  }

  send$(email: string, subject: string, message: string): Observable<any> {
    return this.apiService.post$(this.messagesUrl, {email, subject, message})
  }
}
