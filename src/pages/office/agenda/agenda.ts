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

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private dateService: DateService, private focusService: FocusService) {
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
    this.scope$ = this.scopeService.scope$;
    this.focus$ = this.focusService.focus$;
  }

  ionViewDidEnter() {
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
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
