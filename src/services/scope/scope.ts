import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Scope, Scopes} from "../../models/scope";
import {AlertController} from "ionic-angular";

@Injectable()
export class ScopeService {
  _scope$: BehaviorSubject<Scope> = new BehaviorSubject<Scope>(Scope.DAY);

  get scope$() {
    return this._scope$.asObservable()
  }

  get scopes$() {
    return Observable.of(Scopes)
  }

  constructor(private alertCtrl: AlertController) {
    console.log('Hello ScopeService Provider');
  }

  setScope(scope: Scope): Promise<Scope> {
    this._scope$.next(scope);
    return new Promise((resolve, reject) => {
      resolve(scope);
    });
  }

  selectScope() {
    console.log('selecting scope');
    let alert = this.alertCtrl.create();
    alert.setTitle('Scope');

    Scopes.forEach((scope) => {
      alert.addInput({
        type: 'radio',
        label: scope.toString(),
        value: scope.toString(),
        checked: scope == this._scope$.value
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == this._scope$.value) {
          // Scope has not changed.
          return
        }
        console.log(`Selected scope: ${data}`);
        this._scope$.next(data);
      }
    });
    alert.present();
  }
}
