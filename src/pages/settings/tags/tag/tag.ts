import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../../models/icon";

const TagQuery = gql`
  query TagQuery($id: ID!) {
    tag(id: $id) {
      id
      name
      description
      outcomes {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
          }
        }
      }
      entries: journalEntries {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const UpdateTagMutation = gql`
  mutation UpdateTag($id: ID!, $name: String, $description: String) {
    updateTag(input: {id: $id, name: $name, description: $description}) {
      tag {
        id
        name
        description
      }
    }
  }
`;

const DeleteTagMutation = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage({
  segment: 'tag/:id'
})
@Component({
  selector: 'page-tag',
  templateUrl: 'tag.html',
})
export class TagPage {
  icons;
  loading = true;
  query$;
  tag;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: TagQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tag = data && data.tag;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagPage');
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.tag.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const name = data.name;
            if (name && name != this.tag.name) {
              this.apollo.mutate({
                mutation: UpdateTagMutation,
                variables: {
                  id: this.tag.id,
                  name: name
                }
              }).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  updateDescription() {
    const content = this.tag.description;
    const title = 'Tag details';
    let textModal = this.modalCtrl.create('TextModalPage', { content, title }, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateTagMutation,
          variables: {
            id: this.tag.id,
            description: data.content
          }
        }).subscribe();
      }
    });
    textModal.present();
  }

  delete() {
    const id = this.tag.id;
    this.apollo.mutate({
      mutation: DeleteTagMutation,
      variables: {id},
    }).subscribe();
    this.navCtrl.pop();
  }

}
