import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showMeta() {
    this.navCtrl.push('HomeMetaPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
