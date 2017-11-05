import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";

const NewsQuery = gql`
  query NewsQuery($id: ID!) {
    news: newsItem(id: $id) {
      id
      name
      author {
        name
      }
      date
      imageUrl
      description
      content
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-news-item',
  templateUrl: 'news-item.html',
})
export class NewsItemPage {
  query$;
  loading = true;
  news;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: NewsQuery,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.news = data && data.news;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsItemPage');
  }

}
