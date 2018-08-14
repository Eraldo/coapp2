import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

@IonicPage()
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {
  icons;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
    ) {
    this.icons = Icon;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursesPage');
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
          this.navCtrl.push('TutorialPage', {name: 'Courses'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
