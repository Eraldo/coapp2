import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the LegendCreationPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-legend-creation-password',
  templateUrl: 'legend-creation-password.html',
})
export class LegendCreationPasswordPage {
  @ViewChild('passwordInput') passwordInput;
  password: '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  reset() {
    this.password = ''
  }

  submit(password) {
    console.log(password);
    if (!!this.password && this.password == password) {
      this.next();
    } else {
      this.passwordInput.value = '';
      this.password = password;
    }
  }

  next() {
    this.navCtrl.push('PrologueMockupPage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendCreationPasswordPage');
  }

}
