import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const RolesQuery = gql`
  query {
    roles {
      edges {
        node {
          id
          name
          nickname
          icon
          users {
            edges {
              node {
                id
                avatar
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
  selector: 'page-roles',
  templateUrl: 'roles.html',
})
export class RolesPage {
  query$;
  loading = true;
  roles;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: RolesQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.roles = data && data.roles.edges;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolesPage');
  }

}
