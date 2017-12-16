import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UiService {
  _showMenu$ = new BehaviorSubject<boolean>(false);

  get showMenu$() {
    return this._showMenu$.asObservable()
  }

  openMenu() {
    this._showMenu$.next(true);
  }

  closeMenu() {
    this._showMenu$.next(false);
  }

  constructor() {
    console.log('Hello UiService Provider');
  }

}
