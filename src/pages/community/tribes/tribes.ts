import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const TribesQuery = gql`
  query {
    tribes {
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
    user: myUser {
      tribe
    }
  }
`;

const JoinTribeMutation = gql`
  mutation JoinTribe($id: ID!) {
    joinTribe(input: {id: $id}) {
      tribe {
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

const AddTribeMutation = gql`
  mutation AddTribe($name: String!) {
    addTribe(input: {name: $name}) {
      tribe {
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
  selector: 'page-tribes',
  templateUrl: 'tribes.html',
})
export class TribesPage {
  query$;
  tribes$;
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: TribesQuery});
    this.tribes$ = this.query$.map(({data}) => data && data.tribes);
    this.user$ = this.apollo.watchQuery<any>({query: UserQuery}).map(({data}) => data.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribesPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  join(tribe) {
    this.apollo.mutate({mutation: JoinTribeMutation, variables: {id: tribe.id}})
      .subscribe();
    this.navCtrl.pop()
  }

  add(name) {
    this.apollo.mutate({mutation: AddTribeMutation, variables: {name: name}})
      .subscribe();
    this.navCtrl.pop()
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Tribe',
      inputs: [
        {
          name: 'name',
          placeholder: 'Tribe name...',
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
