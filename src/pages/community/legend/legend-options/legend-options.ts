import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-legend-options',
  templateUrl: 'legend-options.html',
})
export class LegendOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendOptionsPage');
  }

  logout() {
    this.userService.logout();
    this.navCtrl.pop();
  }
}
