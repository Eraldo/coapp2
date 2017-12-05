import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const BookClubQuery = gql`
  query BookClub($search: String) {
    featured: featuredBook {
      id
      name
      author
      imageUrl
      rating
    }
    books(search: $search, public: true) {
      edges {
        node {
          id
          name
          author
          imageUrl
          rating
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-book-club',
  templateUrl: 'book-club.html',
})
export class BookClubPage {
  loading = true;
  query$;
  featured;
  books;
  _search$ = new BehaviorSubject<string>(undefined);


  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, public menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: BookClubQuery,
      variables: {
        search: this._search$
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.featured = data && data.featured;
      this.books = data && data.books;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookClubPage');
  }

  showFilters() {
    this.menuCtrl.open('books-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('books-filter-menu');
  }

  search(query) {
    this._search$.next(query);
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('AcademyOptionsPage');
    popover.present({ev: source});
  }
}
