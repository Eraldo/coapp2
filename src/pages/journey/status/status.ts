import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

const components = ['chapter', 'stats', 'inventory'];

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  components = components;
  selectedComponent = components[0];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

}
