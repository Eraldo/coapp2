import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-community-options',
  templateUrl: 'community-options.html',
})
export class CommunityOptionsPage {

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityOptionsPage');
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Community'})
    });
  }
}
