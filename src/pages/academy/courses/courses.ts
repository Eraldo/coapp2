import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursesPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('AcademyOptionsPage');
    popover.present({ev: source});
  }
}
