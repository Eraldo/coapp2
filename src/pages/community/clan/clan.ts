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
    id
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
  loading = true;
  query$;
  clan;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: UserClanQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.clan = data.viewer.clan;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanPage');
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    // this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
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
    popover.onDidDismiss(() => this.refresh())
  }

}
