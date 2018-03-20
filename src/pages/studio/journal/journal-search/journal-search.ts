import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {MarkdownService} from "ngx-md";
import {Apollo} from "apollo-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const JournalEntriesQuery = gql`
  query JournalEntries($search: String, $cursor: String) {
    viewer {
      id
      entries: journalEntries(search: $search, first: 10, after: $cursor) {
        edges {
          node {
            id
            scope
            start
            keywords
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-journal-search',
  templateUrl: 'journal-search.html',
})
export class JournalSearchPage {
  loading = true;
  query$;
  entries;
  hasNextPage = false;
  cursor;
  search$ = new BehaviorSubject<string>(undefined);

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: JournalEntriesQuery,
      variables: {
        search: this.search$.asObservable()
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.entries = data && data.viewer && data.viewer.entries;
      this.cursor = data.viewer.entries.pageInfo.endCursor;
      setTimeout(() => {
        this.hasNextPage = data.viewer.entries.pageInfo.hasNextPage;
      }, this.hasNextPage ? 0 : 1000)

    })
  }

  search(query) {
    this.search$.next(query);
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
            entries: {
              ...fetchMoreResult.viewer.entries,
              edges: [
                ...previousResult.viewer.entries.edges,
                ...fetchMoreResult.viewer.entries.edges,
              ]
            }
          }
        };
      },
    });
  }


  openEntry(id: string) {
    if (id) {
      this.navCtrl.push('JournalEntryPage', {id})
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalSearchPage');
  }

}
