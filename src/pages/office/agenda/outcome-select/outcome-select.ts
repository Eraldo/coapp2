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
  query Outcomes($status: String, $scope: String, $search: String, $tags: String, $order: String, $cursor: String) {
    viewer {
      id
      outcomes(inbox: false, status: $status, open: true, scope: $scope, search: $search, tags: $tags, orderBy: $order, first: 20, after: $cursor) {
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
  tags;
  _selectedTags$ = new BehaviorSubject<string>(undefined);
  _order$ = new BehaviorSubject<string>(undefined);
  order$: Observable<string>;
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
    this.order$ = this._order$.asObservable();
    this.query$ = this.apollo.watchQuery({
      query: OutcomesQuery,
      variables: {
        scope: this._scope$,
        status: this._status$,
        search: this._search$,
        tags: this._selectedTags$,
        order: this._order$,
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data) {
        this.outcomes = data.viewer.outcomes;
        this.tags = data.viewer.tags;
        // Pagination
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
    this.menuCtrl.enable(true, 'outcome-select-filter-menu')
  }

  loadMore() {
    this.hasNextPage = false;
    this.query$.fetchMore({
      variables: {cursor: this.cursor},
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
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

  setOrder(order: string) {
    this._order$.next(order);
  }

  search(query) {
    this._search$.next(query);
  }

  editTags(selectedTags) {
    this._selectedTags$.next(selectedTags.toString());
  }

  showFilters() {
    this.menuCtrl.open('outcome-select-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('outcome-select-filter-menu');
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
