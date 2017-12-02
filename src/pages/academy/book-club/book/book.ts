import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MarkdownService} from "angular2-markdown";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const BookQuery = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      name
      author
      imageUrl
      url
      content
      rating
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
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

}
