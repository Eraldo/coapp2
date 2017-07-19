import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Outcome} from "../../../../models/outcome";
import {Scope, Scopes} from "../../../../models/scope";
import {OpenStatuses, Status} from "../../../../models/status";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ScopeService} from "../../../../services/scope/scope";
import {OutcomeService} from "../../../../services/outcome/outcome";

@IonicPage()
@Component({
  selector: 'page-outcome-select',
  templateUrl: 'outcome-select.html',
})
export class OutcomeSelectPage {
  scopes: Scope[] = Scopes;
  scope$: Observable<Scope>;
  statuses: Status[] = OpenStatuses;
  _status$ = new BehaviorSubject<Status>(undefined);
  status$: Observable<Status>;
  _search$ = new BehaviorSubject<string>(undefined);
  outcomes$: Observable<Outcome[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController, private scopeService: ScopeService, private outcomeService: OutcomeService) {
  }

  ngOnInit(): void {
    this.scope$ = this.scopeService.scope$;
    this.status$ = this._status$.asObservable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomeSelectPage');
  }

  ionViewDidEnter() {
    this.loadOutcomes()
  }

  loadOutcomes() {
    this.outcomes$ = Observable.combineLatest(this.scope$, this.status$, this._search$, (scope, status, search) => {
      return this.outcomeService.loadOutcomes$(status, scope)
        .map(outcomes => outcomes
          // .filter(outcome => !outcome.isFocus)
          .filter(outcome => outcome.status == Status.OPEN || outcome.status == Status.WAITING)
          .filter(outcome => {
              if (search) {
                return outcome.search(search);
              } else {
                return outcome
              }
            }
          )
        )
    }).switchMap(outcomes$ => outcomes$)
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  setStatus(status: Status) {
    this._status$.next(status);
  }

  showFilters() {
    this.menuCtrl.open('outcome-select-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('outcome-select-filter-menu');
  }

  search(query) {
    this._search$.next(query);
  }

  newOutcome() {
    this.navCtrl.push("OutcomeFormPage")
  }

  select(outcome: Outcome) {
    this.viewCtrl.dismiss(outcome);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
