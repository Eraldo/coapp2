import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../../services/user/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  private form: FormGroup;
  error = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    const email = this.navParams.get('email');
    if (email) {
      this.form = this.formBuilder.group({
        email: [email, Validators.email],
        password: ['', [Validators.required, Validators.minLength(4)]],
      });
    } else {
      this.navCtrl.setRoot('WelcomePage')
    }
  }

  reset() {
    // TODO: Implementing fail logic.
    alert('TODO: Implementing reset logic')
  }

  submit() {
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.userService.login(email, password)
        // .subscribe(
        //   () => {
        //     // Authenticated!
        //     this.next()
        //   },
        //   error => {
        //     // TODO: Implementing fail logic.
        //     this.form.setErrors({password: 'Foo'});
        //     this.error = true;
        //   }
        // )
    }
  }

  next() {
    this.navCtrl.setRoot('HomePage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

}
