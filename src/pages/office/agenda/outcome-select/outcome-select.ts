import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Outcome} from "../../../../models/outcome";
import {Scope, Scopes} from "../../../../models/scope";
import {OpenStatuses, Status} from "../../../../models/status";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const OutcomesQuery = gql`
  query Outcomes($status: String, $scope: String, $search: String, $cursor: String) {
    viewer {
      id
      outcomes(inbox: false, status: $status, open: true, scope: $scope, search: $search, first: 4, after: $cursor) {
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
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-outcome-select',
  templateUrl: 'outcome-select.html',
})
export class OutcomeSelectPage {
  loading = true;
  query$;
  scopes: Scope[] = Scopes;
  _scope$ = new BehaviorSubject<Scope>(undefined);
  statuses: Status[] = OpenStatuses;
  _status$ = new BehaviorSubject<Status>(undefined);
  status$: Observable<Status>;
  _search$ = new BehaviorSubject<string>(undefined);
  outcomes;
  hasNextPage = false;
  cursor;
  excludedIds;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController, private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.excludedIds = this.navParams.get('excludedIds') || [];
    const status = this.navParams.get('status');
    if (status) {
      this.setStatus(status)
    }
    this.status$ = this._status$.asObservable();
    this.query$ = this.apollo.watchQuery({
      query: OutcomesQuery,
      variables: {
        scope: this._scope$,
        status: this._status$,
        search: this._search$
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data) {
        this.outcomes = data.viewer.outcomes;
        this.cursor = data.viewer.outcomes.pageInfo.endCursor;
        setTimeout(() => {
          this.hasNextPage = data.viewer.outcomes.pageInfo.hasNextPage;
        }, this.hasNextPage ? 0 : 1000)
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomeSelectPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
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

  isHidden(id) {
    return this.excludedIds.find(excluded_id => id == excluded_id)
  }

  setScope(scope: Scope) {
    this._scope$.next(scope)
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
    this.navCtrl.push("OutcomeFormPage", {initial: {inbox: false}})
  }

  select(id: string) {
    this.viewCtrl.dismiss(id);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
