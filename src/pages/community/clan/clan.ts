import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {ClanService} from "../../../services/clan/clan";
import {UserService} from "../../../services/user/user";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UserClanQuery = gql`
  query {
    myUser {
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
  myUser: {
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
  clan$: Observable<Clan>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private userService: UserService, private clanService: ClanService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    const query = this.apollo.watchQuery<QueryResponse>({query: UserClanQuery});
    this.clan$ = query.map(({data}) => data.myUser.clan);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanPage');
  }

  ionViewDidEnter() {
    // this.clan$.first().subscribe(clan => {
    //     if (!clan) {
    //       this.navCtrl.push('ClansPage')
    //     }
    //   }
    // )
  }

  showProfile(member) {
    this.navCtrl.push('LegendPage', {id: member.id})
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ClanOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

}
