import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const NewsQuery = gql`
  query {
    news: newsItems(first: 10) {
      edges {
        node {
          id
          name
          author {
            name
          }
          date
          imageUrl
          description
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  query$;
  loading = true;
  news;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: NewsQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.news = data && data.news.edges;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
