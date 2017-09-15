import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const DuosQuery = gql`
  query {
    duos {
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
      duo
    }
  }
`;

const JoinDuoMutation = gql`
  mutation JoinDuo($id: ID!) {
    joinDuo(input: {id: $id}) {
      duo {
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

const AddDuoMutation = gql`
  mutation AddDuo($name: String!) {
    addDuo(input: {name: $name}) {
      duo {
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
  selector: 'page-duos',
  templateUrl: 'duos.html',
})
export class DuosPage {
  query$;
  duos$;
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: DuosQuery});
    this.duos$ = this.query$.map(({data}) => data && data.duos.edges);
    this.user$ = this.apollo.watchQuery<any>({query: UserQuery}).map(({data}) => data.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuosPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  join(duo) {
    this.apollo.mutate({mutation: JoinDuoMutation, variables: {id: duo.id}})
      .subscribe();
    this.navCtrl.pop()
  }

  add(name) {
    this.apollo.mutate({mutation: AddDuoMutation, variables: {name: name}})
      .subscribe();
    this.navCtrl.pop()
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Duo',
      inputs: [
        {
          name: 'name',
          placeholder: 'Duo name...',
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
