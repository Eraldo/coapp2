import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const MyUserQuery = gql`
  query {
    myUser {
      id
      clan
    }
  }
`;

const QuitClanMutation = gql`
  mutation {
    quitClan(input: {}) {
      clan {
        id
        isOpen
        members {
          edges {
            node {
              id
              clan {
                id
              }
            }
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-clan-options',
  templateUrl: 'clan-options.html',
})
export class ClanOptionsPage {
  user$: Observable<User>;

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, private apollo: Apollo) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ngOnInit() {
    this.user$ = this.apollo.query<any>({query: MyUserQuery}).map(({data}) => data.myUser)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanOptionsPage');
  }

  showClans() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('ClansPage');
    });
  }

  quit() {
    this.apollo.mutate({mutation: QuitClanMutation}).subscribe();
    this.viewCtrl.dismiss();
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Community'})
    });
  }
}
