import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Icon} from "../../models/icon";
import {Apollo} from "apollo-angular";

const ContentPageQuery = gql`
  query ContentPage($slug: String) {
    contentPage(slug: $slug) {
      id
      title
      content
      slug
    }
  }
`;

@IonicPage({
  segment: 'page/:slug'
})
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {
  icons;
  loading = true;
  query$;
  page;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.icons = Icon;
  }

  ngOnInit() {
    const slug = this.navParams.get('slug');
    this.query$ = this.apollo.watchQuery({
      query: ContentPageQuery,
      variables: {
        slug
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.page = data && data.contentPage;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPage');
  }

}
