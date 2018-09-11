import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Icon} from "../../models/icon";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {DeleteTensionMutation, TensionFragment} from "../journey/demon/demon";
import {AudioService, Sound} from "../../services/audio/audio";

const TensionQuery = gql`
  query TensionQuery($id: ID!) {
    tension(id: $id) {
      ...Tension
    }
  }
  ${TensionFragment}
`;

export const UpdateTensionMutation = gql`
  mutation UpdateTension($id: ID!, $name: String, $content: String) {
    updateTension(input: {id: $id, name: $name, content: $content}) {
      tension {
        ...Tension
      }
    }
  }
  ${TensionFragment}
`;

@IonicPage({
  segment: 'tension/:id'
})
@Component({
  selector: 'page-tension',
  templateUrl: 'tension.html',
})
export class TensionPage {
  icons;
  loading = true;
  query$;
  tension;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public audioService: AudioService,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: TensionQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tension = data && data.tension;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TensionPage');
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.tension.name
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
            if (name && name != this.tension.name) {
              this.apollo.mutate({
                mutation: UpdateTensionMutation,
                variables: {
                  id: this.tension.id,
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

  updateContent() {
    const content = this.tension.content;
    const title = 'Tension details';
    let textModal = this.modalCtrl.create('TextModalPage', { content, title }, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateTensionMutation,
          variables: {
            id: this.tension.id,
            content: data.content
          }
        }).subscribe();
      }
    });
    textModal.present();
  }

  delete() {
    const id = this.tension.id;
    this.apollo.mutate({
      mutation: DeleteTensionMutation,
      variables: {id},
    }).subscribe(() => {
      this.audioService.play(Sound.DELETE);
      this.navCtrl.pop();
    });
  }
}
