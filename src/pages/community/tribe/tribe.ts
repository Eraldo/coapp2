import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../../models/user";
import {Clan} from "../../../models/clan";
import {UserService} from "../../../services/user/user";
import {TribeService} from "../../../services/tribe/tribe";
import gql from "graphql-tag";
import {Apollo, ApolloQueryObservable} from "apollo-angular";

const UserTribeQuery = gql`
  query {
    myUser {
      id
      tribe {
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
    tribe: Tribe
  }
}

interface Tribe {
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
  selector: 'page-tribe',
  templateUrl: 'tribe.html',
})
export class TribePage {
  query$: ApolloQueryObservable<any>;
  loading = true;
  tribe$: Observable<Tribe>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: UserTribeQuery});
    this.query$.subscribe(({loading}) => this.loading = loading);
    this.tribe$ = this.query$.map(({data}) => data.myUser.tribe)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribePage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  chooseTribe() {
    this.navCtrl.push('TribesPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('TribeOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

}
