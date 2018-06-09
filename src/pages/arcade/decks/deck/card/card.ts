import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../../../models/icon";

const CardQuery = gql`
  query Card($id: ID!) {
    card(id: $id) {
      id
      name
      image
      content
      categories {
        edges {
          node {
            id
            order
          }
        }
      }
    }
  }
`;

@IonicPage({
  segment: 'card/:id'
})
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  icons;
  loading = true;
  query$;
  card;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: CardQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.card = data && data.card;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

  getAreaIcon(area) {
    switch (area) {
      case 1: return this.icons.AREA1;
      case 2: return this.icons.AREA2;
      case 3: return this.icons.AREA3;
      case 4: return this.icons.AREA4;
      case 5: return this.icons.AREA5;
      case 6: return this.icons.AREA6;
      case 7: return this.icons.AREA7;
    }
  }
}
