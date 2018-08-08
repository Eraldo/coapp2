import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";

const BondingCardsDeckQuery = gql`
  query BondingCardsDeck {
    deck: bondingCards {
      id
      cards {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-bonding-cards',
  templateUrl: 'bonding-cards.html',
})
export class BondingCardsPage {
  icons;
  loading = true;
  query$;
  deck;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public modalCtrl: ModalController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: BondingCardsDeckQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.deck = data && data.deck;
    })
  }

  pickRandomCard() {
    if (!this.deck) {return}
    const cards = this.deck.cards.edges.map(edge => edge.node);
    let randomCard = cards[Math.floor(Math.random() * cards.length)];
    this.navCtrl.push('CardPage', {id: randomCard.id}, {animate: false})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BondingCardsPage');
  }

}
