import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-academy-options',
  templateUrl: 'academy-options.html',
})
export class AcademyOptionsPage {

  constructor(
    public app: App,
    public viewCtrl: ViewController,
    public navParams: NavParams,
  ) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcademyOptionsPage');
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Academy'})
    });
  }
}
