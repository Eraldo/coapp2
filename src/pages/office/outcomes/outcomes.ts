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
  search$: Observable<string>;
  _search$ = new BehaviorSubject<string>(undefined);
  _showCompleted$ = new BehaviorSubject<boolean>(false);
  showCompleted$: Observable<boolean>;
  outcomes$: Observable<Outcome[]>;
  canAddOutcome$: Observable<boolean>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private outcomeService: OutcomeService, public menuCtrl: MenuController) {
  }

  ngOnInit(): void {
    this.scope$ = this.scopeService.scope$;
    this.status$ = this._status$.asObservable();
    this.search$ = this._search$.asObservable();
    this.showCompleted$ = this._showCompleted$.asObservable();
    this.canAddOutcome$ = this.outcomeService.canAddOutcome$;
  }

  ionViewDidEnter() {
    this.outcomes$ = Observable.combineLatest(this.outcomeService.scopedOutcomes$, this.search$, this.status$, this.showCompleted$, (outcomes, search, status, showCompleted) => {
      return outcomes.filter(outcome => {
        // Filter by search query.
        if (search && !outcome.search(search)) {
          return false;
        }
        // Filter by selected status.
        if (status && outcome.status != status) {
          return false;
        }
        // Filter by showCompleted filter.
        if (!showCompleted && outcome.isClosed) {
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

  toggleCompleted() {
    this._showCompleted$.next(!this._showCompleted$.value)
  }

  search(query) {
    this._search$.next(query);
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
