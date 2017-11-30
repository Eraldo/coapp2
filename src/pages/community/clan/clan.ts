import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UserClanQuery = gql`
  query {
    viewer {
      id
      clan {
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
    clan: Clan
  }
}

interface Clan {
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
  selector: 'page-clan',
  templateUrl: 'clan.html',
})
export class ClanPage {
  query$;
  clan$: Observable<Clan>;
  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: UserClanQuery});
    this.query$.subscribe(({loading}) => this.loading = loading);
    this.clan$ = this.query$.map(({data}) => data.viewer.clan);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  showProfile(member) {
    this.navCtrl.push('LegendPage', {id: member.id})
  }

  chooseClan() {
    this.navCtrl.push('ClansPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ClanOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

}
