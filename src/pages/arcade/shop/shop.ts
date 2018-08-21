import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const ViewerQuery = gql`
  query {
    user: viewer {
      id
      balance
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  loading = true;
  query$;
  balance;
  icons;

  getGems(area) {
    // const balance = this.balance;
    const balance = 480;
    if (!balance) {
      return 0
    }
    switch (area) {
      case 1: {
        return balance * 100 % 10
      }
      case 2: {
        return balance * 10 % 10
      }
      case 3: {
        return balance % 10
      }
      case 4: {
        return Math.floor(balance / 10) % 10
      }
      case 5: {
        return Math.floor(balance / 100) % 10
      }
      case 6: {
        return Math.floor(balance / 1000) % 10
      }
      case 7: {
        return Math.floor(balance / 10000) % 10
      }
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: ViewerQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.balance = data && data.user && data.user.balance;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  refresh() {
    this.query$.refetch();
  }

  addCredit() {

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
          this.navCtrl.push('TutorialPage', {name: 'Shop'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
