import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit {
  enterForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private userService: UserService) {
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
      this.userService.userExists$({email})
        .subscribe(found => {
          if (found) {
            // User has account.
            this.navCtrl.push('AuthenticationPage', {email})
          } else {
            // User is new.
            this.navCtrl.push('LegendCreationNamePage', {email})
          }
        }, console.error);
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
