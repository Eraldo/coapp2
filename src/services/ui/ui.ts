import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Http, Headers, RequestOptions} from "@angular/http";
import {ConfigService} from "../config/config";
import {UserService} from "../user/user";

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

  constructor(private userService: UserService) {
    console.log('Hello UiService Provider');
    this.userService.authenticated$
      .subscribe(authenticated => this._showMenu$.next(authenticated))

  }

}
