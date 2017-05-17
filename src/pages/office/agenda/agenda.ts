import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from "moment";
import {Scope, SCOPES} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage implements OnInit {
  date: string;
  scope$: Observable<Scope>;
  scopes: Scope[] = SCOPES;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService) {
  }

  ngOnInit(): void {
    this.date = moment().toISOString();
    this.scope$ = this.scopeService.scope$
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
  }

}
