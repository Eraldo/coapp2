import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // TODO: Auto forward the user if he is logged in. (needs to wait for userService)
    // There might still be some errors in the below code.
    this.userService.authenticated$.distinct().take(2).subscribe(authenticated => {
      if (authenticated) {
        this.success()
      }
    })
  }

  join() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userService.join(email, password).subscribe(console.log)
    } else {
      alert('TODO: join when form not valid');
    }
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userService.login$(email, password).subscribe(
        console.log,
        console.error
      )
    } else {
      alert('TODO: login when form not valid');
    }
  }

  private success() {
    this.navCtrl.setRoot('HomePage')
  }

  loginWithGoogle() {
    alert('TODO: loginWithGoogle')
  }
}
