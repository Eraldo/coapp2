import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";

const DecksQuery = gql`
  query Decks {
    decks {
      edges {
        node {
          id
          name
          image
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-decks',
  templateUrl: 'decks.html',
})
export class DecksPage {
  icons;
  loading = true;
  query$;
  decks;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: DecksQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.decks = data && data.decks;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DecksPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

}
