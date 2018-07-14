import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {titleCase} from "../../../../utils/utils";

export const RoleFragment = gql`
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
    viewer {
      id
      isSuperuser
    }
    role(id: $id) {
      ...Role
    }
  }
  ${RoleFragment}
`;

const UpdateRoleMutation = gql`
  mutation UpdateRole($id: ID!, $name: String, $nickname: String, $item: String, $purpose: String, $strategy: String, $powers: String, $services: String, $policies: String, $history: String, $notes: String, $checklists: String, $metrics: String) {
    updateRole(input: {id: $id, name: $name, nickname: $nickname, item: $item, purpose: $purpose, strategy: $strategy, powers: $powers, services: $services, policies: $policies, history: $history, notes: $notes, checklists: $checklists, metrics: $metrics}) {
      role {
        ...Role
      }
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
  viewer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public modalCtrl: ModalController) {
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
      this.viewer = data && data.viewer;
    })
  }

  update(field, label = '') {
    // Permission check.
    if (this.viewer && this.viewer.isSuperuser) {
      const title = titleCase(label || field);
      const content = this.role[field];
      let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
      textModal.onDidDismiss(data => {
        if (data && data.content != content) {
          let variables = {id: this.role.id};
          variables[field] = data.content;
          this.apollo.mutate({
            mutation: UpdateRoleMutation,
            variables
          }).subscribe();
        }
      });
      textModal.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolePage');
  }

}
