import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

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
      videoUrl
      description
      content
    }
  }
`;

@IonicPage({
  segment: 'news/:id'
})
@Component({
  selector: 'page-news-item',
  templateUrl: 'news-item.html',
})
export class NewsItemPage {
  query$;
  loading = true;
  news;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: NewsQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.news = data && data.news;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsItemPage');
  }

}
