import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mockup',
  templateUrl: 'mockup.html',
})
export class MockupPage {
  pages = [
    {name: 'Welcome', component: 'WelcomeMockupPage'},
    {name: 'Prologue', component: 'PrologueMockupPage'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MockupPage');
  }

  pushPage(page) {
    this.navCtrl.push(page.component);
  }
}
