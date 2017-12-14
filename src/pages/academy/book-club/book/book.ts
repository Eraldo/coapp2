import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {MarkdownService} from "angular2-markdown";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

export const BookQuery = gql`
  query Book($id: ID!) {
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

    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  query$;
  loading = true;
  book;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: BookQuery,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.book = data && data.book;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  review() {
    this.navCtrl.push('BookReviewFormPage', {id: this.book.id})
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('AcademyOptionsPage');
    popover.present({ev: source});
  }

}
