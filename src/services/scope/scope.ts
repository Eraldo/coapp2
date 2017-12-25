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

  zoomOut() {
    const index = Scopes.indexOf(this._scope$.value) + 1;
    if (index < Scopes.length) {
      this.setScope(Scopes[index]);
    }
  }

  zoomIn() {
    const index = Scopes.indexOf(this._scope$.value) - 1;
    if (index >= 0) {
      this.setScope(Scopes[index]);
    }
  }

  selectScope() {
    this.scope$.first().subscribe(currentScope => {
        console.log('selecting scope');
        let alert = this.alertCtrl.create();
        alert.setTitle('Scope');

        Scopes.forEach((scope) => {
          alert.addInput({
            type: 'radio',
            label: scope.toString(),
            value: scope.toString(),
            checked: scope == currentScope
          });
        });

        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            if (data == currentScope) {
              // Scope has not changed.
              return
            }
            console.log(`Selected scope: ${data}`);
            this.setScope(data);
          }
        });
        alert.present();
      }
    );
  }
}
