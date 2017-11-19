import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query {
    viewer {
      id
      tags {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

const CreateMutation = gql`
  mutation Create($name: String!, $description: String) {
    createTag(input: {name: $name, description: $description}) {
      success
    }
  }
`;


@IonicPage()
@Component({
  selector: 'page-tags',
  templateUrl: 'tags.html',
})
export class TagsPage {
  loading = true;
  query$;
  tags;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tags = data && data.viewer && data.viewer.tags;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagsPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
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
              this.apollo.mutate({
                mutation: CreateMutation,
                variables: {name, description: ''},
                refetchQueries: [{query: Query}]
              })
            }
          }
      ]
    });
    prompt.present();
  }

}
