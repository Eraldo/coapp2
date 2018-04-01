import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Scope, Scopes} from "../../models/scope";
import {AlertController} from "ionic-angular";

@Injectable()
export class ScopeService {
  _scope$ = new BehaviorSubject<Scope>(Scope.DAY);

  get scope$() {
    return this._scope$.asObservable();
  }

  get scopes$() {
    return Observable.of(Scopes)
  }

  constructor(private alertCtrl: AlertController) {
    console.log('Hello ScopeService Provider');
  }

  setScope(scope: Scope) {
    this._scope$.next(scope);
  }

  zoomOut(scope: Scope): Promise<Scope> {
    return new Promise((resolve, reject) => {
      const index = Scopes.indexOf(scope) + 1;
      if (index < Scopes.length) {
        resolve(Scopes[index]);
      } else {
        reject(`No bigger scope found for ${scope}.`)
      }
    });
  }

  zoomIn(scope: Scope): Promise<Scope> {
    return new Promise((resolve, reject) => {
      const index = Scopes.indexOf(scope) - 1;
      if (index >= 0) {
        resolve(Scopes[index]);
      } else {
        reject(`No smaller scope found for ${scope}.`)
      }
    });
  }

  selectScope(scope): Promise<Scope | undefined> {
    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create();
      alert.setTitle('Scope');

      Scopes.forEach((scopeOption) => {
        alert.addInput({
          type: 'radio',
          label: scopeOption.toString(),
          value: scopeOption.toString(),
          checked: scopeOption == scope
        });
      });

      alert.addButton({
        text: 'Cancel',
        role: 'cancel',
        handler: () => reject('Canceled scope selection.')
      });

      alert.addButton({
        text: 'OK',
        handler: data => {
          if (data == scope) {
            reject('Scope has not changed.');
          }
          alert.dismiss().then(() => resolve(data));
          return false;
        }
      });

      alert.present();
    });
  }
}
