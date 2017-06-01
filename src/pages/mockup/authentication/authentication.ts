import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  @ViewChild('passwordInput') passwordInput;
  password: string;
  error = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.password = 'test';
  }

  reset() {
    // TODO: Implementing fail logic.
    alert('TODO: Implementing reset logic')
  }

  submit(password) {
    console.log(password);
    if (password == this.password) {
      // Authenticated!
      this.next();
    } else {
      // TODO: Implementing fail logic.
      this.error = true;
      // this.passwordInput.value = '';
    }
  }

  next() {
    this.navCtrl.push('HomePage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

}
