import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tabs} from 'ionic-angular';

@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
@IonicPage()
export class JourneyPage {
  @ViewChild('tabs') tabs: Tabs;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyPage');
  }

  ionViewDidEnter() {
    this.tabs.select(0);
    this.tabs.select(0);
  }

}
