import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const LibraryQuery = gql`
  query Library($search: String, $tags: String, $order: String, $cursor: String) {
    viewer {
      id
      isPremium
    }
    featured: featuredBook {
      id
      name
      author
      imageUrl
      rating
      reviewed
    }
    books(search: $search, tags: $tags, public: true, orderBy: $order, first: 20, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          author
          imageUrl
          rating
          reviewed
        }
      }
    }
    tags: bookTags {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {
  loading = true;
  query$;
  featured;
  books;
  tags;
  selectedTags$ = new BehaviorSubject<string>(undefined);
  search$ = new BehaviorSubject<string>(undefined);
  order$ = new BehaviorSubject<string>("-rating");
  hasNextPage = false;
  cursor;
  icons;
  viewer;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: LibraryQuery,
      variables: {
        search: this.search$.value,
        tags: this.selectedTags$.value,
        order: this.order$.value,
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data) {
        this.viewer = data.viewer;
        this.featured = data.featured;
        this.books = data.books;
        this.tags = data.tags;
        // Pagination
        this.cursor = data.books.pageInfo.endCursor;
        setTimeout(() => {
          this.hasNextPage = data.books.pageInfo.hasNextPage;
        }, this.hasNextPage ? 0 : 1000)
      }
    });
    this.search$.subscribe(search => this.query$.refetch({search}));
    this.selectedTags$.subscribe(tags => this.query$.refetch({tags}));
    this.order$.subscribe(order => this.query$.refetch({order}));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LibraryPage');
  }

  refresh() {
    this.query$.refetch();
  }

  get orderName() {
    return this.order$.value.replace('-', '')
  }

  showFilters() {
    this.menuCtrl.open('books-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('books-filter-menu');
  }

  search(query) {
    this.search$.next(query);
  }

  editTags(selectedTags) {
    this.selectedTags$.next(selectedTags.toString());
  }

  setOrder(order: string) {
    this.order$.next(order);
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
          books: {
            ...fetchMoreResult.books,
            edges: [
              ...previousResult.books.edges,
              ...fetchMoreResult.books.edges,
            ]
          }
        };
      },
    });
  }

  openVirtualRoom() {
    this.navCtrl.push('VirtualRoomPage', {name: 'library'});
  }

  showOptions(event) {
    let options = [
      {
        text: 'Refresh',
        handler: () => {
          this.refresh();
        }
      },
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Library'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
