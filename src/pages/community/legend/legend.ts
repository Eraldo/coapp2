import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {ANONYMOUS_USER} from "../../../models/user";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Observable} from "rxjs/Observable";

const MyUserQuery = gql`
  query {
    user: myUser {
      id
    }
  }
`;

const UserQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      name
      avatar(size: LARGE)
      gender
      purpose
      dateJoined
      level
    }
  }
`;

const UpdateUsernameMutation = gql`
  mutation UpdateUsername($username: String!) {
    updateUser(input: {username: $username}) {
      user {
        id
        username
      }
    }
  }
`;

const UpdateNameMutation = gql`
  mutation UpdateName($name: String!) {
    updateUser(input: {name: $name}) {
      user {
        id
        name
      }
    }
  }
`;

const UpdateGenderMutation = gql`
  mutation UpdateGender($gender: String!) {
    updateUser(input: {gender: $gender}) {
      user {
        id
        gender
      }
    }
  }
`;

const UpdatePurposeMutation = gql`
  mutation UpdatePurpose($purpose: String!) {
    updateUser(input: {purpose: $purpose}) {
      user {
        id
        purpose
        avatar
      }
    }
  }
`;

interface User {
  id
  username
  name
  avatar
  gender
  purpose
  dateJoined
  level
}

interface UserResponse {
  user: User
  loading
}


@IonicPage()
@Component({
  selector: 'page-legend',
  templateUrl: 'legend.html',
})
export class LegendPage {
  user$: Observable<User>;
  currentUser$: Observable<User>;
  default_image = ANONYMOUS_USER.image;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public alertCtrl: AlertController, private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.apollo.watchQuery<UserResponse>({
      query: MyUserQuery
    }).map(({data}) => data.user);
    const id$ = this.currentUser$.map(user => this.navParams.get('id') || user.id);
    this.user$ = this.apollo.watchQuery<UserResponse>({
      query: UserQuery,
      variables: {id: id$}
    }).map(({data}) => data.user);
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('LegendOptionsPage');
    popover.present({ev: source});
  }

  updateName() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Name',
          inputs: [
            {
              name: 'name',
              placeholder: 'Name',
              value: legend.name
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Save',
              handler: data => {
                const name = data.name;
                if (name && name.length >= 4) {

                  this.apollo.mutate({
                    mutation: UpdateNameMutation,
                    variables: {
                      name: name
                    }
                  });
                } else {
                  // TODO: Show error message: "Name has to be at least 4 characters long."
                }
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  updateUsername() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Username',
          inputs: [
            {
              name: 'username',
              placeholder: 'Username',
              value: legend.username
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Save',
              handler: data => {
                const username = data.username;
                if (username && username.length >= 4) {
                  this.apollo.mutate({
                    mutation: UpdateUsernameMutation,
                    variables: {
                      username: username
                    }
                  });
                } else {
                  // TODO: Show error message: "Username has to be at least 4 characters long."
                }
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  updatePurpose() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Purpose',
          inputs: [
            {
              name: 'purpose',
              placeholder: 'Purpose',
              value: legend.purpose
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Save',
              handler: data => {
                const purpose = data.purpose;
                if (purpose && purpose.length >= 4) {
                  // this.userService.updateUser({purpose});
                  this.apollo.mutate({
                    mutation: UpdatePurposeMutation,
                    variables: {
                      purpose: purpose
                    }
                  });

                } else {
                  // TODO: Show error message: "Purpose has to be at least 4 characters long."
                }
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  updateGender() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Gender',
          inputs: [
            {
              type: 'radio',
              label: 'Male',
              value: 'M',
              checked: legend.gender == 'M'
            },
            {
              type: 'radio',
              label: 'Female',
              value: 'F',
              checked: legend.gender == 'F'
            },
            {
              type: 'radio',
              label: 'Neutral',
              value: 'N',
              checked: legend.gender == 'N'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Save',
              handler: data => {
                const gender = data;
                this.apollo.mutate({
                  mutation: UpdateGenderMutation,
                  variables: {
                    gender: gender
                  }
                });
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendPage');
  }

}
