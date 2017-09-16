import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {AlertController, NavController} from "ionic-angular";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {DateService} from "../../../../services/date/date";

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
    }
  }
`;

const UserFocusQuery = gql`
  query UserFocus($id: ID!, $scope: String!, $start: String!) {
    user(id: $id) {
      id
      focuses(scope: $scope, start: $start) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const ContactUserMutation = gql`
  mutation ContactUser($id: ID!, $subject: String, $message: String) {
    contactUser(input: {id: $id, subject: $subject, message: $message}) {
      success
    }
  }
`;

@Component({
  selector: 'duo-user-card',
  templateUrl: 'duo-user-card.html'
})
export class DuoUserCardComponent {
  @Input() userId: string;
  user$: Observable<User>;
  myUser$: Observable<User>;
  focus$;

  constructor(public navCtrl: NavController, private apollo: Apollo, public alertCtrl: AlertController, public dateService: DateService) {
    console.log('Hello DuoUserCardComponent Component');
  }

  ngOnChanges() {
    this.myUser$ = this.apollo.watchQuery<any>({query: MyUserQuery}).map(({data}) => data.myUser);
    this.user$ = this.apollo.watchQuery<any>({
      query: UserQuery,
      variables: {id: this.userId}
    }).map(({data}) => data.user);

    this.focus$ = this.apollo.watchQuery<any>({
      query: UserFocusQuery,
      variables: {id: this.userId, scope: 'day', start: this.dateService.date$}
    })
      .map(({data}) => data && data.user.focuses.edges[0] && data.user.focuses.edges[0].node)
  }

  contact() {
    Observable.combineLatest(this.user$, this.myUser$, (legend, user) => {
        let prompt = this.alertCtrl.create({
          title: 'Message',
          message: `To: ${legend.name || legend.username}`,
          inputs: [
            {
              name: 'message',
              placeholder: 'My message...',
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
                const message = data.message;
                this.apollo.mutate({mutation: ContactUserMutation, variables: {id: legend.id, message}})
              }
            }
          ]
        });
        prompt.present();
      }
    ).first().subscribe()
  }

  showFocus() {
    this.focus$.subscribe(focus => {
      if (focus) {
        this.navCtrl.push('FocusPage', {id: focus.id});
      }
    })
  }

}
