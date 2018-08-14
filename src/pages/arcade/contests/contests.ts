import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

@IonicPage()
@Component({
  selector: 'page-contests',
  templateUrl: 'contests.html',
})
export class ContestsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestsPage');
  }

  refresh() {
    // this.query$.refetch();
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
          this.navCtrl.push('TutorialPage', {name: 'Contests'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
