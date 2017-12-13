import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const ClansQuery = gql`
  query {
    clans {
      edges {
        node {
          id
          name
          isOpen
          members {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const UserQuery = gql`
  query {
    user: viewer {
      clan
    }
  }
`;

const JoinClanMutation = gql`
  mutation JoinClan($id: ID!) {
    joinClan(input: {id: $id}) {
      clan {
        id
        name
        isOpen
        members {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

const AddClanMutation = gql`
  mutation AddClan($name: String!) {
    addClan(input: {name: $name}) {
      clan {
        id
        name
        isOpen
        members {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-clans',
  templateUrl: 'clans.html',
})
export class ClansPage {
  query$;
  clans$;
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: ClansQuery});
    this.clans$ = this.query$.map(({data}) => data && data.clans);
    this.user$ = this.apollo.watchQuery<any>({query: UserQuery}).map(({data}) => data.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClansPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  join(clan) {
    this.apollo.mutate({
      mutation: JoinClanMutation,
      variables: {id: clan.id}
    }).subscribe();
    this.navCtrl.pop()
  }

  add(name) {
    this.apollo.mutate({
      mutation: AddClanMutation,
      variables: {name: name}
    }).subscribe();
    this.navCtrl.pop()
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Clan',
      inputs: [
        {
          name: 'name',
          placeholder: 'Clan name...',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const name = data.name;
            this.add(name);
          }
        }
      ]
    });
    prompt.present();
  }
}
