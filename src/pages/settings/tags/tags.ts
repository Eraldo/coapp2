import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query {
    viewer {
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
  selector: 'page-tags',
  templateUrl: 'tags.html',
})
export class TagsPage {
  loading = true;
  query$;
  tags;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tags = data && data.viewer && data.viewer.tags;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagsPage');
  }

}
