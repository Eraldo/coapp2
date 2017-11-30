import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UserDuoQuery = gql`
  query {
    viewer {
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
  viewer: {
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
  loading = true;
  duo: Duo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: UserDuoQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.duo = data.viewer.duo;
    });
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    // this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  chooseDuo() {
    this.navCtrl.push('DuosPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('DuoOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.refresh())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoPage');
  }

}
