import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tabs} from 'ionic-angular';

@Component({
  selector: 'page-arcade',
  templateUrl: 'arcade.html'
})
@IonicPage()
export class ArcadePage {
  @ViewChild('tabs') tabs: Tabs;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArcadePage');
  }

  ionViewDidEnter() {
    this.tabs.select(0);
    this.tabs.select(0);
  }

}
