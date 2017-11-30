import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UsersQuery = gql`
  query Users {
    users {
      edges {
        node {
          id
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-users-admin',
  templateUrl: 'users-admin.html',
})
export class UsersAdminPage {
  loading = true;
  query$;
  users;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: UsersQuery,
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.users = data.users;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersAdminPage');
  }

}
