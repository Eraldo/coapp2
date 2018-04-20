import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Scope, Scopes} from "../../../models/scope";
import {Status, Statuses} from "../../../models/status";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";

const OutcomesQuery = gql`
  query Outcomes($status: String, $closed: Boolean, $scope: String, $search: String, $tags: String, $order: String, $cursor: String) {
    viewer {
      id
      outcomes(inbox: false, status: $status, closed: $closed, scope: $scope, search: $search, tags: $tags, orderBy: $order, first: 20, after: $cursor) {
        totalCount
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
  icons;
  loading = true;
  query$;
  scopes: Scope[] = Scopes;
  scope$ = new BehaviorSubject<Scope>(undefined);
  statuses: Status[] = Statuses;
  status$ = new BehaviorSubject<Status>(undefined);
  search$ = new BehaviorSubject<string>(undefined);
  tags;
  selectedTags$ = new BehaviorSubject<string>(undefined);
  showCompleted$ = new BehaviorSubject<boolean>(false);
  order$ = new BehaviorSubject<string>(undefined);
  hasNextPage = false;
  cursor;
  outcomes;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public menuCtrl: MenuController, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery({
      query: OutcomesQuery,
      variables: {
        status: this.status$.value,
        closed: this.showCompleted$.value ? null : false,
        scope: this.scope$.value,
        search: this.search$.value,
        tags: this.selectedTags$.value,
        order: this.order$.value,
      }
    });
    this.query$.valueChanges.subscribe(data => this.processQuery(data));
    this.scope$.subscribe(scope => this.query$.refetch({scope}));
    this.status$.subscribe(status => this.query$.refetch({status}));
    this.search$.subscribe(search => this.query$.refetch({search}));
    this.selectedTags$.subscribe(tags => this.query$.refetch({tags}));
    this.order$.subscribe(order => this.query$.refetch({order}));
    this.showCompleted$.subscribe(showCompleted => this.query$.refetch({closed: showCompleted ? null : false}));
  }

  ionViewDidEnter() {
    this.refresh();
    this.menuCtrl.enable(true, 'outcomes-filter-menu')
  }

  refresh() {
    this.query$.refetch();
  }

  processQuery({data, loading}) {
    this.loading = loading;
    this.tags = data && data.viewer && data.viewer.tags;
    this.outcomes = data && data.viewer && data.viewer.outcomes;
    this.cursor = data && data.viewer && data.viewer.outcomes && data.viewer.outcomes.pageInfo.endCursor;
    setTimeout(() => {
      this.hasNextPage = data && data.viewer && data.viewer.outcomes.pageInfo.hasNextPage;
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
    this.scope$.next(scope)
  }

  setStatus(status: Status) {
    this.status$.next(status);
  }

  setOrder(order: string) {
    this.order$.next(order);
  }

  toggleCompleted() {
    this.showCompleted$.next(!this.showCompleted$.value)
  }

  search(query) {
    this.search$.next(query);
  }

  editTags(selectedTags) {
    this.selectedTags$.next(selectedTags.toString());
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
