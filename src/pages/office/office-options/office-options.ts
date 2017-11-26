import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-office-options',
  templateUrl: 'office-options.html',
})
export class OfficeOptionsPage {

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficeOptionsPage');
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Office'})
    });
  }
}
