import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-legend-creation-name',
  templateUrl: 'legend-creation-name.html',
})
export class LegendCreationNamePage {
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    const email = this.navParams.get('email');
    if (email) {
      this.form = this.formBuilder.group({
        email: [email, Validators.email],
        name: ['', [Validators.required, Validators.minLength(4)]],
      });
    } else {
      this.navCtrl.setRoot('WelcomePage')
    }
  }

  submit() {
    if (this.form.valid) {
      const email = this.form.value.email;
      const name = this.form.value.name;
      this.navCtrl.push('LegendCreationPasswordPage', {email, name})
    } else {
      // TODO: Implementing fail logic.
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendCreationNamePage');
  }

}
