import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-journey-options',
  templateUrl: 'journey-options.html',
})
export class JourneyOptionsPage {

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyOptionsPage');
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Journey'})
    });
  }
}
