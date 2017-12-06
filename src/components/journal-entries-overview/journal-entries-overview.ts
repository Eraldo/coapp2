import {Component, Input} from '@angular/core';
import {getNextScopedDate, getScopeEnd, getScopeStart, getSubScope} from "../../models/scope";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import moment from "moment";

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
            end
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

  constructor(private apollo: Apollo) {
    console.log('Hello JournalEntriesOverviewComponent Component');
  }

  get subScope() {
    return getSubScope(this.scope);
  }

  ngOnChanges() {
    this.start = getScopeStart(this.scope, this.start);
    this.end = getScopeEnd(this.scope, this.start);
    const subScope = this.subScope;
    this.entries = [];
    if (subScope) {
      let date = this.start;
      while (subScope && date <= this.end) {
        this.entries.push({scope: subScope, start: getScopeStart(subScope, date), end: getScopeEnd(subScope, date)});
        date = getNextScopedDate(subScope, date);
      }
      this.apollo.watchQuery<any>({
        query: EntriesQuery,
        variables: {scope: subScope, start: this.start, end: this.end}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        const foundEntries = data.viewer.entries;
        console.log(foundEntries);
        if (foundEntries) {
          const entries = foundEntries.edges.map(edge => edge.node);
          this.entries = this.entries.map(entry => {
            return entries.find(e => e.start == entry.start) || entry;
          });
        }
      });
    }
  }

  getColor(date) {
    return `area-${moment(date).isoWeekday()}`;
  }
  // get entries() {
  //   const scope = this.scope;
  //   let start = this.start;
  //   const end = getScopeEnd(scope, start);
  //   const subScope = this.subScope;
  //   let entries = [];
  //   while (start <= end) {
  //     entries.push({scope: subScope, start: getScopeStart(subScope, start)});
  //     start = getNextScopedDate(subScope, start);
  //   }
  //   return entries;
  // }

}
