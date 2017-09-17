import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      token
      user {
        id
        name
        avatar
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  private form: FormGroup;
  error = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private apollo: Apollo) {
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

      this.apollo.mutate<any>({mutation: LoginMutation, variables: {email, password}})
        .subscribe(({data}) => {
          const token = data.login.token;
          if (token) {
            localStorage.setItem('token', token);
            this.apollo.getClient().resetStore();
            this.next()
          } else {
            // TODO: Inform user of missing token.
          }
        }, (error) => {
          console.log('there was an error sending the query', error);
          this.form.setErrors({password: 'Foo'});
          this.error = true;
        });
    }
  }

  next() {
    this.navCtrl.setRoot('HomePage')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

}
