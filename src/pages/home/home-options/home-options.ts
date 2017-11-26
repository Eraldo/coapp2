import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-options',
  templateUrl: 'home-options.html',
})
export class HomeOptionsPage {

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeOptionsPage');
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Home'})
    });
  }
}
