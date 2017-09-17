import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const IsAuthenticatedQuery = gql`
  query IsAuthenticated {
    isAuthenticated
  }
`;

const UserExistsQuery = gql`
  query UserExists($email: String!) {
    userExists(email: $email)
  }
`;

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit {
  enterForm: FormGroup;
  processing = false;

  constructor(private apollo: Apollo, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.enterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.apollo.watchQuery<any>({query: IsAuthenticatedQuery})
      .subscribe(({data, loading}) => {
        if (data.isAuthenticated) {
          this.redirect()
        }
      });
  }

  private redirect() {
    this.navCtrl.setRoot('HomePage')
  }

  enterWithEmail() {
    if (this.enterForm.valid) {
      const email = this.enterForm.value.email;
      this.processing = true;
      // Checking if the user is known.
      this.apollo.query<any>({
        query: UserExistsQuery,
        variables: {email}
      }).subscribe(({data, loading}) => {
        if (data.userExists) {
          // User has account.
          this.navCtrl.push('AuthenticationPage', {email})
        } else {
          // User is new.
          this.navCtrl.push('LegendCreationNamePage', {email})
        }
      });
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
