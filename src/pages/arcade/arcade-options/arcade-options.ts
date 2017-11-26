import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-arcade-options',
  templateUrl: 'arcade-options.html',
})
export class ArcadeOptionsPage {

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArcadeOptionsPage');
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Arcade'})
    });
  }
}
