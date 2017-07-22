import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";
import {Outcome} from "../../../models/outcome";
import {OutcomeService} from "../../../services/outcome/outcome";
import {Status, Statuses} from "../../../models/status";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@IonicPage()
@Component({
  selector: 'page-outcomes',
  templateUrl: 'outcomes.html',
})
export class OutcomesPage implements OnInit {
  scopes: Scope[] = Scopes;
  scope$: Observable<Scope>;
  statuses: Status[] = Statuses;
  _status$ = new BehaviorSubject<Status>(undefined);
  status$: Observable<Status>;
  outcomes$: Observable<Outcome[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private outcomeService: OutcomeService, public menuCtrl: MenuController) {
  }

  ngOnInit(): void {
    this.scope$ = this.scopeService.scope$;
    this.status$ = this._status$.asObservable();
  }

  ionViewDidEnter() {
    this.outcomes$ = Observable.combineLatest(this.outcomeService.scopedOutcomes$, this.status$, (outcomes, status) => {
      return outcomes.filter(outcome => {
        if (status && outcome.status != status) {
          return false;
        }
        return true
      });
    });
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  setStatus(status: Status) {
    this._status$.next(status);
  }

  showFilters() {
    this.menuCtrl.open('filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('filter-menu');
  }

  newOutcome() {
    this.navCtrl.push("OutcomeFormPage")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomesPage');
  }

}
