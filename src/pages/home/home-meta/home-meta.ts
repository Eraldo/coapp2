import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-meta',
  templateUrl: 'home-meta.html',
})
export class HomeMetaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeMetaPage');
  }

  next() {
    this.navCtrl.pop()

  }
}
