import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";

const UserTribeQuery = gql`
  query {
    viewer {
      id
      tribe {
        id
        name
        members {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-tribe',
  templateUrl: 'tribe.html',
})
export class TribePage {
  query$;
  loading = true;
  tribe;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery({query: UserTribeQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tribe = data.viewer.tribe;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribePage');
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    // this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  chooseTribe() {
    this.navCtrl.push('TribesPage');
  }

  openVirtualRoom() {
    window.open(`https://meet.jit.si/colegend/${this.tribe.id}`, '_blank')
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('TribeOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.refresh())
  }

}
