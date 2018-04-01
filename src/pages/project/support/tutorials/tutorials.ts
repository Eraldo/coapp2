import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query {
    tutorials {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-tutorials',
  templateUrl: 'tutorials.html',
})
export class TutorialsPage {
  query$;
  loading = true;
  tutorials;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tutorials = data && data.tutorials;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialsPage');
  }

}
