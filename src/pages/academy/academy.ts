import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Tabs} from 'ionic-angular';

@Component({
  selector: 'page-academy',
  templateUrl: 'academy.html'
})
@IonicPage()
export class AcademyPage {
  @ViewChild('tabs') tabs: Tabs;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcademyPage');
  }

  ionViewDidEnter() {
    this.tabs.select(0);
    this.tabs.select(0);
  }

}
