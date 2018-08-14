import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
  ) {
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

  refresh() {
    this.query$.refetch();
  }

  wip() {
    alert('Under construction');
  }

  showOptions(event) {
    let options = [
      {
        text: 'Refresh',
        handler: () => {
          this.refresh();
        }
      },
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Games'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
