import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UserDuoQuery = gql`
  query {
    myUser {
      id
      duo {
        id
        name
        members {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

interface QueryResponse {
  myUser: {
    duo: Duo
  }
}

interface Duo {
  name
  members: {
    edges: {
      id
      name
    }[]
  }
}

@IonicPage()
@Component({
  selector: 'page-duo',
  templateUrl: 'duo.html',
})
export class DuoPage implements OnInit {
  query$;
  loading$;
  duo$: Observable<Duo>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: UserDuoQuery});
    this.loading$ = this.query$.map(({loading}) => loading);
    this.duo$ = this.query$.map(({data}) => data.myUser.duo)
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  chooseDuo() {
    this.navCtrl.push('DuosPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('DuoOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoPage');
  }

}
