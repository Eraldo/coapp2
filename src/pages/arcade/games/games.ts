import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";

const Query = gql`
  query {
    bondingCardsCheckpoint: hasCheckpoint(name: "bonding cards")
    cardsOfLifeCheckpoint: hasCheckpoint(name: "cards of life")
  }
`;

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  query$;
  loading = true;
  icons;
  bondingCardsCheckpoint = false;
  cardsOfLifeCheckpoint = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.bondingCardsCheckpoint = data.bondingCardsCheckpoint;
      this.cardsOfLifeCheckpoint = data.cardsOfLifeCheckpoint;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
  }

  wip() {
    alert('Under construction');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ArcadeOptionsPage');
    popover.present({ev: source});
  }
}
