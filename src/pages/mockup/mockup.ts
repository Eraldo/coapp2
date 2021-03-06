import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mockup',
  templateUrl: 'mockup.html',
})
export class MockupPage {
  pages = [
    {name: 'Welcome v1', component: 'WelcomeMockupPage'},
    {name: 'Welcome v2', component: 'WelcomePage'},
    {name: 'Prologue', component: 'ProloguePage'},
    {name: 'Introduction', component: 'LegendCreationNamePage'},
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
