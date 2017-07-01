import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  @ViewChild('passwordInput') passwordInput;
  email: string;
  error = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ngOnInit(): void {
    const email = this.navParams.get('email');
    if (email) {
      this.email = email;
    } else {
      this.navCtrl.setRoot('WelcomePage')
    }
  }

  reset() {
    // TODO: Implementing fail logic.
    alert('TODO: Implementing reset logic')
  }

  submit(password) {
    this.userService.login$(this.email, password)
      .subscribe(
        () => {
          // Authenticated!
          console.log('>> authenticated!');
          this.next()
        },
        error => {
          // TODO: Implementing fail logic.
          this.error = true;
        }
      )
  }

  next() {
    this.navCtrl.setRoot('HomePage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

}
