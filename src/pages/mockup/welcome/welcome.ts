import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit {
  enterForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.enterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  enterWithEmail() {
    if (this.enterForm.valid) {
      const email = this.enterForm.value.email;
      // Checking if the user is known.
      if (email == 'eraldo@eraldo.org') {
        // User has account.
        this.navCtrl.push('LegendCreationPasswordPage')
      } else {
        // User is new.
        this.navCtrl.push('LegendCreationNamePage')
      }
      // const email = this.enterForm.value.email;
      // const password = this.enterForm.value.password;
      // this.userService.join(email, password)
      // // .then(() => this.success())
      //   .catch(error => alert(error.message));
    } else {
      alert('TODO: Implementing logic when form not valid');
    }
  }

  enterWithGoogle() {
    alert('TODO: Use google to enter');
  }

  enterWithFacebook() {
    alert('TODO: Use facebook to enter');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
