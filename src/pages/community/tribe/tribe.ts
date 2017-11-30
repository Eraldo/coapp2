import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {Apollo, ApolloQueryObservable} from "apollo-angular";

const UserTribeQuery = gql`
  query {
    viewer {
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
  viewer: {
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
    this.tribe$ = this.query$.map(({data}) => data.viewer.tribe)
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
