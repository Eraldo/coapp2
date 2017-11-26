import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";
import {Outcome} from "../../../models/outcome";
import {Status, Statuses} from "../../../models/status";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const OutcomesQuery = gql`
  query Outcomes($status: String, $closed: Boolean, $scope: String!, $search: String) {
    myUser {
      id
      outcomes(inbox: false, status: $status, closed: $closed, scope: $scope, search: $search) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-outcomes',
  templateUrl: 'outcomes.html',
})
export class OutcomesPage implements OnInit {
  loading = true;
  query$;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, public menuCtrl: MenuController, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.scope$ = this.scopeService.scope$;
    this.status$ = this._status$.asObservable();
    this.search$ = this._search$.asObservable();
    this.showCompleted$ = this._showCompleted$.asObservable();
    // this.canAddOutcome$ = this.outcomeService.canAddOutcome$;
    this.query$ = this.apollo.watchQuery({
      query: OutcomesQuery,
      variables: {
        status: this.status$,
        closed: this.showCompleted$.map(showCompleted => showCompleted ? null : false),
        scope: this.scope$,
        search: this.search$,
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
    });
    this.outcomes$ = this.query$.map(({data}) => data.myUser.outcomes.edges);
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  refresh() {
    this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
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

  showInbox() {
    this.navCtrl.push("InboxPage")
  }

  newOutcome() {
    this.navCtrl.push("OutcomeFormPage", {initial: {inbox: false}})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomesPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('OfficeOptionsPage');
    popover.present({ev: source});
  }
}
