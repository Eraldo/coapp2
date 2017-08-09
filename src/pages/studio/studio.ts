import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tabs} from 'ionic-angular';

@Component({
  selector: 'page-studio',
  templateUrl: 'studio.html'
})
@IonicPage()
export class StudioPage {
  @ViewChild('tabs') tabs: Tabs;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudioPage');
  }

  ionViewDidEnter() {
    this.tabs.select(0);
    this.tabs.select(0);
  }

}

