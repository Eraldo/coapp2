import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {AlertController, NavController} from "ionic-angular";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import * as moment from "moment";
import {getScopeStart, Scope} from "../../../../models/scope";

const ViewerQuery = gql`
  query {
    viewer {
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
  selector: 'clan-user-card',
  templateUrl: 'clan-user-card.html'
})
export class ClanUserCardComponent {
  @Input() userId: string;
  user$: Observable<User>;
  viewer$: Observable<User>;
  focus$;

  constructor(public navCtrl: NavController, private apollo: Apollo, public alertCtrl: AlertController) {
    console.log('Hello ClanUserCardComponent Component');
  }

  ngOnChanges() {
    this.viewer$ = this.apollo.watchQuery<any>({query: ViewerQuery}).valueChanges.map(({data}) => data.viewer);
    this.user$ = this.apollo.watchQuery<any>({
      query: UserQuery,
      variables: {id: this.userId}
    }).valueChanges.map(({data}) => data.user);

    this.focus$ = this.apollo.watchQuery<any>({
      query: UserFocusQuery,
      variables: {id: this.userId, scope: 'week', start: getScopeStart(Scope.WEEK, moment().format('YYYY-MM-DD'))}
    })
      .valueChanges.map(({data}) => data && data.user.focuses.edges[0] && data.user.focuses.edges[0].node)

  }

  contact() {
    Observable.combineLatest(this.user$, this.viewer$, (legend, user) => {
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
                this.apollo.mutate({
                  mutation: ContactUserMutation,
                  variables: {id: legend.id, message}
                }).subscribe();
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
      } else {
        let alert = this.alertCtrl.create({
          title: 'No focus set yet',
          message: 'How about asking for it. :)',
          buttons: ['Ok']
        });
        alert.present();
      }
    })
  }

}
