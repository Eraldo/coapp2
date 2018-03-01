import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const JoinMutation = gql`
  mutation Join($email: String!, $password: String!, $username: String!, $name: String) {
    join(input: {email: $email, password: $password, username: $username, name: $name}) {
      user {
        id
        email
        name
      }
      token
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-legend-creation-password',
  templateUrl: 'legend-creation-password.html',
})
export class LegendCreationPasswordPage {
  private form: FormGroup;
  processing = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private apollo: Apollo) {
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
      this.processing = true;
      // TODO: Refactoring join logic.
      const email = this.form.value.email;
      const name = this.form.value.name;
      const password = this.form.value.password;
      const firstName = name.split(' ', 1)[0];
      const username = firstName.length >= 4 ? firstName : name.replace(/ /g,'');

      this.apollo.mutate<any>({
        mutation: JoinMutation,
        variables: {email, password, username, name}
      }).subscribe(({data}) => {
        const token = data.join.token;
        if (token) {
          localStorage.setItem('token', token);
          this.next()
        } else {
        // TODO: Inform user of missing token.
        }
      })
    } else {
      // this.form.value.password = '';
    }
  }

  next() {
    this.apollo.getClient().resetStore();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendCreationPasswordPage');
  }

}
