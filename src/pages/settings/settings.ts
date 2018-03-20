import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  resetPassword() {
    window.open('https://www.colegend.org/accounts/password/reset/', '_blank')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
