import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const RoleFragment = gql`
  fragment Role on RoleNode {
    id
    name
    nickname
    item
    icon
    kind
    circle {
      id
      name
    }
    purpose
    strategy
    powers
    services
    policies
    history
    notes
    checklists
    metrics
    users {
      edges {
        node {
          id
          avatar
        }
      }
    }
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

const RoleQuery = gql`
  query RoleQuery($id: ID!) {
    role(id: $id) {
      ...Role
    }
  }
  ${RoleFragment}
`;


@IonicPage({
  segment: 'role/:id'
})
@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
})
export class RolePage {
  query$;
  loading = true;
  role;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: RoleQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.role = data && data.role;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolePage');
  }

}
