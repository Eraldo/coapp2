import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Scope, Scopes} from "../../../../models/scope";
import {OpenStatuses, Status} from "../../../../models/status";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../../models/icon";
import {OutcomeService} from "../../../../services/outcome/outcome";

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
  icons = Icon;
  loading = true;
  query$;
  scopes: Scope[] = Scopes;
  scope$ = new BehaviorSubject<Scope>(undefined);
  statuses: Status[] = OpenStatuses;
  status$ = new BehaviorSubject<Status>(undefined);
  search$ = new BehaviorSubject<string>(undefined);
  tags;
  selectedTags$ = new BehaviorSubject<string>(undefined);
  order$ = new BehaviorSubject<string>(undefined);
  outcomes;
  hasNextPage = false;
  cursor;
  excludedIds;
  multiple;
  selectMin;
  selectMax;
  selectedIds;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController, private apollo: Apollo, public outcomeService: OutcomeService) {
  }

  ngOnInit(): void {
    this.excludedIds = this.navParams.get('excludedIds') || [];
    this.selectedIds = this.navParams.get('selectedIds') || [];
    this.multiple = this.navParams.get('multiple') || false;
    this.selectMax = this.navParams.get('selectMax');
    this.selectMin = this.navParams.get('selectMin');
    const status = this.navParams.get('status');
    if (status) {
      this.setStatus(status)
    }
    this.query$ = this.apollo.watchQuery({
      query: OutcomesQuery,
      variables: {
        scope: this.scope$.value,
        status: this.status$.value,
        search: this.search$.value,
        tags: this.selectedTags$.value,
        order: this.order$.value,
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
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
    this.scope$.subscribe(scope => this.query$.refetch({scope}));
    this.status$.subscribe(status => this.query$.refetch({status}));
    this.search$.subscribe(search => this.query$.refetch({search}));
    this.selectedTags$.subscribe(tags => this.query$.refetch({tags}));
    this.order$.subscribe(order => this.query$.refetch({order}));
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

  private isHidden(id) {
    return this.excludedIds.find(excluded_id => id == excluded_id)
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

  search(query) {
    this.search$.next(query);
  }

  editTags(selectedTags) {
    this.selectedTags$.next(selectedTags.toString());
  }

  showFilters() {
    this.menuCtrl.open('outcome-select-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('outcome-select-filter-menu');
  }

  createOutcome() {
    this.outcomeService.createOutcome();
  }

  private isSelected(id) {
    return this.selectedIds.find(selected_id => id == selected_id);
  }

  select(id: string) {
    if (this.multiple) {
      const index = this.selectedIds.indexOf(id);
      // Check if it is already selected.
      if (index > -1) {
        // Yes: Deselect it.
        this.selectedIds.splice(index, 1);
      } else {
        // No: Select it.
        // Only if maximum selection is not reached.
        if (!this.selectMax || this.selectedIds.length < this.selectMax) {
          this.selectedIds.push(id);
        }
      }
    } else {
      // Single selection.
      this.viewCtrl.dismiss(id);
    }
  }

  save() {
    this.viewCtrl.dismiss(this.selectedIds);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
