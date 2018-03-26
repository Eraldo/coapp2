import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";
import {Observable} from "rxjs/Observable";
import {DateService} from "../../../services/date/date";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {getNextScopedDate, getScopeEnd, getScopeStart, getSubScope} from "../../../models/scope";
import {Icon} from "../../../models/icon";

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
  loading = true;
  query$;
  start$;
  scope;
  start;
  entry;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, private dateService: DateService, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ngOnInit(): void {
    this.start$ = Observable.combineLatest(this.scopeService.scope$, this.dateService.date$, (scope, date) => {
      this.loading = true;
      this.scope = scope;
      this.start = getScopeStart(scope, date);
      return this.start;
    });
    this.query$ = this.apollo.watchQuery({
      query: JournalEntryQuery,
      variables: {scope: this.scopeService.scope$, start: this.start$}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.entry = data.viewer.journalEntries.edges[0] &&
        data.viewer.journalEntries.edges[0].node;
    });
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  edit() {
    if (this.entry) {
      this.navCtrl.push('JournalEntryFormPage', {id: this.entry.id});
    } else {
      this.add()
    }
  }

  add() {
    this.navCtrl.push('JournalEntryFormPage');
  }

  search() {
    this.navCtrl.push('JournalSearchPage');
  }

  selectScope() {
    this.scopeService.selectScope()
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
