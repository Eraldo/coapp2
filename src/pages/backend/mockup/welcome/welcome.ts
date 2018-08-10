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
  loading;
  enterForm: FormGroup;
  processing = false;
  redirectUrl;
  constructor(private apollo: Apollo, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.redirectUrl = this.navParams.get('redirectUrl');

    this.enterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.apollo.watchQuery<any>({query: IsAuthenticatedQuery})
      .valueChanges.subscribe(({data, loading}) => {
        this.loading = loading;
        if (data.isAuthenticated) {
          this.redirect()
        }
      });
  }

  private redirect() {
    if (this.redirectUrl) {
      window.open(this.redirectUrl);
    } else {
      // default redirect.
      this.navCtrl.setRoot('HomePage')
    }
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
        const redirectUrl = this.redirectUrl;
        if (data.userExists) {
          // User has account.
          this.navCtrl.push('AuthenticationPage', {email, redirectUrl})
        } else {
          // User is new.
          this.navCtrl.push('LegendCreationNamePage', {email, redirectUrl})
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
