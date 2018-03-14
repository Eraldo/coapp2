import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {Outcome} from "../../../models/outcome";
import {Status, Statuses} from "../../../models/status";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const OutcomesQuery = gql`
  query Outcomes($status: String, $closed: Boolean, $scope: String, $search: String, $tags: String, $order: String, $cursor: String) {
    viewer {
      id
      outcomes(inbox: false, status: $status, closed: $closed, scope: $scope, search: $search, tags: $tags, orderBy: $order, first: 20, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
          }
        }
      }
      tags {
        edges {
          node {
            id
            name
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
  _scope$ = new BehaviorSubject<Scope>(undefined);
  scope$: Observable<Scope>;
  statuses: Status[] = Statuses;
  _status$ = new BehaviorSubject<Status>(undefined);
  status$: Observable<Status>;
  _search$ = new BehaviorSubject<string>(undefined);
  search$: Observable<string>;
  tags;
  _selectedTags$ = new BehaviorSubject<string>(undefined);
  _showCompleted$ = new BehaviorSubject<boolean>(false);
  _order$ = new BehaviorSubject<string>(undefined);
  order$: Observable<string>;
  hasNextPage = false;
  cursor;
  showCompleted$: Observable<boolean>;
  outcomes$: Observable<Outcome[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public menuCtrl: MenuController, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.scope$ = this._scope$.asObservable();
    this.status$ = this._status$.asObservable();
    this.search$ = this._search$.asObservable();
    this.showCompleted$ = this._showCompleted$.asObservable();
    this.order$ = this._order$.asObservable();
    this.query$ = this.apollo.watchQuery({
      query: OutcomesQuery,
      variables: {
        status: this.status$,
        closed: this.showCompleted$.map(showCompleted => showCompleted ? null : false),
        scope: this._scope$,
        search: this.search$,
        tags: this._selectedTags$,
        order: this._order$,
      }
    });
    this.query$.subscribe(data => this.processQuery(data));
    this.outcomes$ = this.query$.map(({data}) => data.viewer.outcomes.edges);
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.hasNextPage = false;
    this.query$.refetch().then(data => this.processQuery(data));
  }

  processQuery({data, loading}) {
    this.loading = loading;
    this.tags = data.viewer.tags;
    this.cursor = data.viewer.outcomes.pageInfo.endCursor;
    setTimeout(() => {
      this.hasNextPage = data.viewer.outcomes.pageInfo.hasNextPage;
    }, this.hasNextPage ? 0 : 1000)
  }

  loadMore() {
    this.hasNextPage = false;
    this.query$.fetchMore({
      variables: {cursor: this.cursor},
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        return {
          ...previousResult,
          viewer: {
            ...previousResult.viewer,
            outcomes: {
              ...fetchMoreResult.viewer.outcomes,
              edges: [
                ...previousResult.viewer.outcomes.edges,
                ...fetchMoreResult.viewer.outcomes.edges,
              ]
            }
          }
        };
      },
    });
  }

  setScope(scope: Scope) {
    this._scope$.next(scope)
  }

  setStatus(status: Status) {
    this._status$.next(status);
  }

  setOrder(order: string) {
    this._order$.next(order);
  }

  toggleCompleted() {
    this._showCompleted$.next(!this._showCompleted$.value)
  }

  search(query) {
    this._search$.next(query);
  }

  editTags(selectedTags) {
    this._selectedTags$.next(selectedTags.toString());
  }

  showFilters() {
    this.menuCtrl.open('outcomes-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('outcomes-filter-menu');
  }

  showInbox() {
    this.navCtrl.push("InboxPage")
  }

  showMatching() {
    this.navCtrl.push("OutcomeMatchPage")
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
