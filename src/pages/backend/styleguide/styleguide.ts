import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Icon} from "../../../models/icon";

@IonicPage()
@Component({
  selector: 'page-styleguide',
  templateUrl: 'styleguide.html',
})
export class StyleguidePage {
  icons = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let icon in Icon) {
      this.icons.push({name: Icon[icon], label: icon})
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StyleguidePage');
  }

}
