import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const MyUserQuery = gql`
  query {
    myUser {
      id
      tribe
    }
  }
`;

const QuitTribeMutation = gql`
  mutation {
    quitTribe(input: {}) {
      tribe {
        id
        isOpen
        members {
          edges {
            node {
              id
              tribe {
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
  selector: 'page-tribe-options',
  templateUrl: 'tribe-options.html',
})
export class TribeOptionsPage {
  user$: Observable<any>;

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, private apollo: Apollo) {
  }

  get navCtrl(): NavController {
    return this.app.getActiveNav();
  }

  ngOnInit() {
    this.user$ = this.apollo.query<any>({query: MyUserQuery}).map(({data}) => data.myUser)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribeOptionsPage');
  }

  showTribes() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TribesPage');
    });
  }

  quit() {
    this.apollo.mutate({mutation: QuitTribeMutation}).subscribe();
    this.viewCtrl.dismiss();
  }

  showTutorial() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('TutorialPage', {name: 'Community'})
    });
  }
}
