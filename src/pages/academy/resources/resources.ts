import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

@IonicPage()
@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
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
          this.navCtrl.push('TutorialPage', {name: 'Resources'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
