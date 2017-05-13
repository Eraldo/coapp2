import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Scope, SCOPES} from "../../../models/scope";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-outcomes',
  templateUrl: 'outcomes.html',
})
export class OutcomesPage {
  scopes: Scope[] = SCOPES;
  scope$: Observable<Scope>;
  // outcomes$: Observable<Outcome[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // TODO: Make dynamic from service.
    this.scope$ = Observable.of(Scope.DAY)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomesPage');
  }

}
