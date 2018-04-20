import {Component, Input} from '@angular/core';
import {getNextScopedDate, getScopeEnd, getScopeStart, getSubScope} from "../../models/scope";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import * as moment from "moment";
import {NavController} from "ionic-angular";
import {Icon} from "../../models/icon";

const EntriesQuery = gql`
  query Entries($scope: String!, $start: Date!, $end: Date!) {
    viewer {
      id
      entries: journalEntries(scope: $scope, start_Gte: $start, start_Lte: $end) {
        edges {
          node {
            id
            scope
            start
            keywords
          }
        }
      }
    }
  }
`;

@Component({
  selector: 'journal-entries-overview',
  templateUrl: 'journal-entries-overview.html'
})
export class JournalEntriesOverviewComponent {
  @Input() scope;
  @Input() start;
  query$;
  loading = true;
  end;
  entries = [];
  icons;

  constructor(public navCtrl: NavController, private apollo: Apollo) {
    console.log('Hello JournalEntriesOverviewComponent Component');
    this.icons = Icon;
  }

  refresh() {
    this.query$.refetch();
  }

  get subScope() {
    return getSubScope(this.scope);
  }

  get today() {
    return moment().format('YYYY-MM-DD');
  }

  ngOnChanges() {
    this.start = getScopeStart(this.scope, this.start);
    this.end = getScopeEnd(this.scope, this.start);
    const subScope = this.subScope;
    this.entries = [];
    if (subScope) {
      let date = getScopeStart(subScope, this.start);
      while (subScope && date <= this.end) {
        this.entries.push({scope: subScope, start: getScopeStart(subScope, date), end: getScopeEnd(subScope, date)});
        date = getNextScopedDate(subScope, date);
      }
      this.query$ = this.apollo.watchQuery<any>({
        query: EntriesQuery,
        variables: {scope: subScope, start: getScopeStart(this.subScope, this.start), end: this.end}
      });
      this.query$.valueChanges.subscribe(({data, loading}) => {
        this.loading = loading;
        const foundEntries = data.viewer.entries;
        if (foundEntries) {
          const entries = foundEntries.edges.map(edge => edge.node);
          this.entries = this.entries.map(entry => {
            return entries.find(e => e.start == entry.start) || entry;
          });
        }
      });
    }
  }

  openEntry(entry) {
    if (entry.id) {
      this.navCtrl.push('JournalEntryPage', {id: entry.id});
    } else {
      this.navCtrl.push('JournalEntryFormPage', {scope: this.subScope, date: entry.start});
    }
  }
}
