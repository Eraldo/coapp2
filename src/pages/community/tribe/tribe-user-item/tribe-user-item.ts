import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {AlertController, NavController} from "ionic-angular";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {getScopeStart, Scope} from "../../../../models/scope";
import {DateService} from "../../../../services/date/date";
import moment from "moment";

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
      email
      avatar
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
  selector: 'tribe-user-item',
  templateUrl: 'tribe-user-item.html'
})
export class TribeUserItemComponent {
  @Input() userId: string;
  user$: Observable<User>;
  viewer$: Observable<User>;
  focus$;

  constructor(public navCtrl: NavController, private apollo: Apollo, public alertCtrl: AlertController, public dateService: DateService) {
    console.log('Hello TribeUserItemComponent Component');
  }

  ngOnChanges() {
    this.viewer$ = this.apollo.watchQuery<any>({query: ViewerQuery}).valueChanges.map(({data}) => data.viewer);
    this.user$ = this.apollo.watchQuery<any>({
      query: UserQuery,
      variables: {id: this.userId}
    }).valueChanges.map(({data}) => data.user);

    this.focus$ = this.apollo.watchQuery<any>({
      query: UserFocusQuery,
      variables: {id: this.userId, scope: 'month', start: getScopeStart(Scope.MONTH, moment().format('YYYY-MM-DD'))}
    })
      .valueChanges.map(({data}) => data && data.user.focuses.edges[0] && data.user.focuses.edges[0].node)

  }

  showProfile() {
    this.navCtrl.push('LegendPage', {id: this.userId})
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
