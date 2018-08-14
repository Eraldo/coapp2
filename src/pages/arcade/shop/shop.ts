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
