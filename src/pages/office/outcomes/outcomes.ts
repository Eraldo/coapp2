import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Scope, SCOPES} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";

@IonicPage()
@Component({
  selector: 'page-outcomes',
  templateUrl: 'outcomes.html',
})
export class OutcomesPage implements OnInit {
  scopes: Scope[] = SCOPES;
  scope$: Observable<Scope>;
  // outcomes$: Observable<Outcome[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService) {
  }

  ngOnInit(): void {
    this.scope$ = this.scopeService.scope$
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomesPage');
  }

}
