import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";
import {DateService} from "../../../services/date/date";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {getNextScopedDate, getScopeEnd, getScopeStart, getSubScope, Scope} from "../../../models/scope";
import {Icon} from "../../../models/icon";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import moment from "moment";
import {JournalEntriesOverviewComponent} from "../../../components/journal-entries-overview/journal-entries-overview";

const JournalEntryQuery = gql`
  query JournalEntry($scope: String!, $start: String!) {
    viewer {
      id
      journalEntries(scope: $scope, start: $start) {
        edges {
          node {
            id
            scope
            start
            keywords
            content
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit {
  @ViewChild(JournalEntriesOverviewComponent) overview: JournalEntriesOverviewComponent;
  loading = true;
  query$;
  scope$ = new BehaviorSubject<Scope>(Scope.DAY);
  date$ = new BehaviorSubject<string>(moment().format('YYYY-MM-DD'));
  entry;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, private dateService: DateService, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  get scope() {
    return this.scope$.value;
  }

  get start() {
    return getScopeStart(this.scope$.value, this.date$.value)
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery({
      query: JournalEntryQuery,
      variables: {
        scope: this.scope,
        start: this.start
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.entry = data.viewer.journalEntries.edges[0] &&
        data.viewer.journalEntries.edges[0].node;
    });
    this.scope$.subscribe(scope => this.query$.refetch({scope: this.scope, start: this.start}));
    this.date$.subscribe(date => this.query$.refetch({scope: this.scope, start: this.start}));
  }

  ionViewDidEnter() {
    this.refresh();
    if (this.scope != Scope.DAY) {
      this.overview.refresh();
    }
  }

  refresh() {
    this.query$.refetch();
  }

  edit() {
    if (this.entry) {
      this.navCtrl.push('JournalEntryFormPage', {id: this.entry.id});
    } else {
      this.add()
    }
  }

  add() {
    this.navCtrl.push('JournalEntryFormPage', {scope: this.scope, date: this.start});
  }

  search() {
    this.navCtrl.push('JournalSearchPage');
  }

  selectScope() {
    this.scopeService.selectScope(this.scope).then(scope => this.scope$.next(scope), console.log);
  }

  setScope(scope: Scope) {
    this.scope$.next(scope);
  }

  setDate(date: string) {
    this.date$.next(date);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

  getChildren() {
    const scope = this.scope;
    let start = this.start;
    const end = getScopeEnd(scope, start);
    const subScope = getSubScope(scope);
    let children = [];
    while (start <= end) {
      children.push({scope: subScope, start: getScopeStart(subScope, start)});
      start = getNextScopedDate(subScope, start);
    }
    return children;
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('StudioOptionsPage');
    popover.present({ev: source});
  }
}
