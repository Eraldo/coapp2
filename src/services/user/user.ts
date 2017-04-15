import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor() {
    console.log('Hello UserProvider Provider');
  }

  get user$(): Observable<string> {
    return Observable.of('Eraldo');
  }
}
