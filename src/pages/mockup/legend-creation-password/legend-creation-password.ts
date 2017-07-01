import {Component, ViewChild} from '@angular/core';
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
      // TODO: Implementing join logic.
      const email = this.form.value.email;
      const name = this.form.value.name;
      const password = this.form.value.password;
      this.userService.join$(email, password)
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
