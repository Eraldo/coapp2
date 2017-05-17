import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Scope, SCOPES} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";
import {Outcome} from "../../../models/outcome";
import {OutcomeService} from "../../../services/outcome/outcome";

@IonicPage()
@Component({
  selector: 'page-outcomes',
  templateUrl: 'outcomes.html',
})
export class OutcomesPage implements OnInit {
  scopes: Scope[] = SCOPES;
  scope$: Observable<Scope>;
  outcomes$: Observable<Outcome[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private outcomeService: OutcomeService) {
  }

  ngOnInit(): void {
    this.scope$ = this.scopeService.scope$;
    this.outcomes$ = this.outcomeService.outcomes$;
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomesPage');
  }

}
