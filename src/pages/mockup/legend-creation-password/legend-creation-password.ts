import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-legend-creation-password',
  templateUrl: 'legend-creation-password.html',
})
export class LegendCreationPasswordPage {
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    const email = this.navParams.get('email');
    const name = this.navParams.get('name');
    if (email && name) {
      this.form = this.formBuilder.group({
        email: [email, Validators.email],
        name: [name, [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
      });
    } else {
      this.navCtrl.setRoot('WelcomePage')
    }
  }

  submit() {
    if (this.form.valid) {
      // TODO: Refactoring join logic.
      const email = this.form.value.email;
      const name = this.form.value.name;
      const password = this.form.value.password;
      const username = name.split(' ', 1)[0];
      this.userService.join$(email, password, username)
      // I saw some error where the result was empty at first and on the second response I get the expected result.
      //  So I might want to refactor this to filter until the user is there and has been logged in before updating the name.
        .switchMap(user => this.userService.login$(email, password))
        .switchMap(() => this.userService.updateUser$({name}))
        .subscribe(
          user => this.next(),
          console.error
        );
    } else {
      // this.form.value.password = '';
    }
  }

  next() {
    this.navCtrl.push('PrologueMockupPage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendCreationPasswordPage');
  }

}
