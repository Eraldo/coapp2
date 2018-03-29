import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
    this.icons = Icon
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: ViewerQuery,
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.balance = data && data.user && data.user.balance;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ArcadeOptionsPage');
    popover.present({ev: source});
  }

}
