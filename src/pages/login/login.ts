import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  }

  join() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userService.join(email, password)
        .then(() => this.navCtrl.setRoot('HomePage'))
        .catch(error => alert(error.message));
    } else {
      alert('TODO: join when form not valid');
    }
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.userService.login(email, password)
        .then(() => this.navCtrl.setRoot('HomePage'))
        .catch(error => alert(error.message));
    } else {
      alert('TODO: login when form not valid');
    }
  }

  loginWithGoogle() {
    alert('TODO: loginWithGoogle')
  }
}
