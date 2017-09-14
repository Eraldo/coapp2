import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user/user";
import {AlertController, NavController} from "ionic-angular";
import {EmailService} from "../../../../services/email/email";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const MyUserQuery = gql`
  query {
    myUser {
      id
    }
  }
`;

const UserQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
    }
  }
`;

@Component({
  selector: 'tribe-user-item',
  templateUrl: 'tribe-user-item.html'
})
export class TribeUserItemComponent {
  @Input() userId: string;
  user$: Observable<User>;
  myUser$: Observable<User>;

  constructor(public navCtrl: NavController, private apollo: Apollo, public alertCtrl: AlertController) {
    console.log('Hello TribeUserItemComponent Component');
  }

  ngOnChanges() {
    this.myUser$ = this.apollo.watchQuery<any>({query: MyUserQuery}).map(({data}) => data.myUser);
    this.user$ = this.apollo.watchQuery<any>({
      query: UserQuery,
      variables: {id: this.userId}
    }).map(({data}) => data.user);
  }

  showProfile() {
    this.navCtrl.push('LegendPage', {id: this.userId})
  }

  contact() {
    Observable.combineLatest(this.user$, this.myUser$, (legend, user) => {
        let prompt = this.alertCtrl.create({
          title: 'Message',
          inputs: [
            {
              name: 'message',
              placeholder: `My message to ${legend.name || legend.username}...`,
              value: ''
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
              text: 'Send',
              handler: data => {
                const email = legend.email;
                const subject = `New message from ${user.name || user.username}`;
                const message = data.message;
                // this.emailService.send$(email, subject, message).subscribe()
              }
            }
          ]
        });
        prompt.present();
      }
    ).first().subscribe()
  }

}
