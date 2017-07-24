import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";
import {FocusService} from "../../../services/focus/focus";
import {Focus} from "../../../models/focus";
import {DateService} from "../../../services/date/date";

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage implements OnInit {
  date$: Observable<string>;
  scope$: Observable<Scope>;
  scopes: Scope[] = Scopes;
  focus$: Observable<Focus>;
  canCreateFocus$: Observable<boolean>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private dateService: DateService, private focusService: FocusService) {
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
    this.scope$ = this.scopeService.scope$;
    this.focus$ = this.focusService.focus$;
    this.canCreateFocus$ = this.date$.map(date => date >= moment().format('YYYY-MM-DD'))
  }

  ionViewDidEnter() {
  }

  selectScope() {
    this.scopeService.selectScope();
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  selectDate() {
    this.dateService.selectDate();
  }

  next() {
    this.dateService.next()
  }

  previous() {
    this.dateService.previous()
  }

  update() {
    Observable.zip(this.scope$, this.date$, (scope, date) => {
      const start = date;
      this.navCtrl.push('FocusFormPage', {scope, start});
    }).take(1).subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
  }

}
