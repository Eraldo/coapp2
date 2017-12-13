import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const ViewerQuery = gql`
  query {
    viewer {
      id
      duo
    }
  }
`;

const QuitDuoMutation = gql`
  mutation {
    quitDuo(input: {}) {
      duo {
        id
        isOpen
        members {
          edges {
            node {
              id
              duo {
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
  selector: 'page-duo-options',
  templateUrl: 'duo-options.html',
})
export class DuoOptionsPage {
  user$: Observable<User>;

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, private apollo: Apollo) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ngOnInit() {
    this.user$ = this.apollo.query<any>({query: ViewerQuery}).map(({data}) => data.viewer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoOptionsPage');
  }

  showDuos() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('DuosPage');
    });
  }

  quit() {
    this.apollo.mutate({
      mutation: QuitDuoMutation
    }).subscribe();
    this.viewCtrl.dismiss();
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Community'})
    });
  }
}
