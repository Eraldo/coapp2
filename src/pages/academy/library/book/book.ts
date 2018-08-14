import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../../models/icon";

export const BookQuery = gql`
  query Book($id: ID!) {
    viewer {
      id
      isPremium
    }
    book(id: $id) {
      id
      name
      author
      imageUrl
      url
      content
      rating
      areaRatings
      reviewed
      reviews: bookReviews {
        edges {
          node {
            id
            rating
            content
            area1
            area2
            area3
            area4
            area5
            area6
            area7
            owner {
              id
              name
            }
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
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  icons;
  query$;
  loading = true;
  book;
  viewer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: BookQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.book = data && data.book;
      this.viewer= data && data.viewer;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  review() {
    this.navCtrl.push('BookReviewFormPage', {id: this.book.id})
  }

  buy() {
    window.open(this.book.url, '_blank')
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('AcademyOptionsPage');
    popover.present({ev: source});
  }

}
