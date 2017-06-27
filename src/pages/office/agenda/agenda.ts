import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";
import {FocusService} from "../../../services/focus/focus";
import {Focus} from "../../../models/focus";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private focusService: FocusService) {
  }

  ngOnInit(): void {
    this.date$ = Observable.of(moment().toISOString());
    this.scope$ = this.scopeService.scope$;

  }

  ionViewDidEnter() {
    this.loadFocus()
  }

  loadFocus() {
    this.focus$ = Observable.combineLatest(this.scope$, this.date$, (scope, date) => {
      return this.focusService.getFocus$(scope, date)
    }).switchMap(focus$ => focus$);
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
  }

}
