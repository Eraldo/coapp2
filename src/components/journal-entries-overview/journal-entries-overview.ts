import {Component, Input} from '@angular/core';
import {getNextScopedDate, getScopeEnd, getScopeStart, getSubScope} from "../../models/scope";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import * as moment from "moment";
import {NavController} from "ionic-angular";

const EntriesQuery = gql`
  query Entries($scope: String!, $start: String!, $end: String!) {
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

  constructor(public navCtrl: NavController, private apollo: Apollo) {
    console.log('Hello JournalEntriesOverviewComponent Component');
  }

  get subScope() {
    return getSubScope(this.scope);
  }

  get today() {
    return moment().format('YYYY-MM-DD');
  }

  get startDateFormat() {
    // only show the year if it is neither the current year nor the same as the end date.
    return `MMM D${this.today.slice(0, 4) == this.start.slice(0, 4) || this.start.slice(0, 4) == this.end.slice(0, 4) ? '' : ', YYYY'}`;
  }

  get endDateFormat() {
    // only show the month if it is different from the starting month and only show the year if it is not the current year.
    return `${this.start.slice(0, 7) == this.end.slice(0, 7) ? '' : 'MMM '}D${this.today.slice(0, 4) == this.end.slice(0, 4) ? '' : ', YYYY'}`;
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
      console.log(this.subScope, getScopeStart(this.subScope, this.start), this.end);
      this.apollo.watchQuery<any>({
        query: EntriesQuery,
        variables: {scope: subScope, start: getScopeStart(this.subScope, this.start), end: this.end}
      }).subscribe(({data, loading}) => {
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

  openEntry(id: string) {
    if (id) {
      this.navCtrl.push('JournalEntryPage', {id})
    }
  }
}
