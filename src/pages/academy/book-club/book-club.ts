import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const BookClubQuery = gql`
  query BookClub {
    featured: featuredBook {
      id
      name
      author
      imageUrl
      rating
    }
    books {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: BookClubQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.featured = data && data.featured;
      this.books = data && data.books;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookClubPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('AcademyOptionsPage');
    popover.present({ev: source});
  }
}
