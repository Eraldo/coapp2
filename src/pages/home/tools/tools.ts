import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

@IonicPage()
@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html',
})
export class ToolsPage {
  icons = Icon;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolsPage');
  }

  showOptions(event) {
    let options = [
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Tools'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
