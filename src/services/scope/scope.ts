import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Scope, Scopes} from "../../models/scope";
import {AlertController} from "ionic-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {SetScopeAction} from "../../store/actions/scope";

@Injectable()
export class ScopeService {

  get scope$() {
    return this.store.select(fromRoot.getScope);
  }

  get scopes$() {
    return Observable.of(Scopes)
  }

  constructor(private alertCtrl: AlertController, private store: Store<fromRoot.State>) {
    console.log('Hello ScopeService Provider');
  }

  setScope(scope: Scope) {
    this.store.dispatch(new SetScopeAction(scope));
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
