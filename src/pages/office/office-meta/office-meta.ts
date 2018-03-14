import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const ResetOutcomesScoreMutation = gql`
  mutation ResetOutcomesScore($id: ID) {
    resetOutcomesScore(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-office-meta',
  templateUrl: 'office-meta.html',
})
export class OfficeMetaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficeMetaPage');
  }

  requestPriorityReset() {
    let alert = this.alertCtrl.create({
      title: 'Priority Reset!',
      message: 'This will reset the priority for all your outcomes. Are you sure you want this?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'I am sure',
          handler: () => {
            this.resetPriority();
          }
        }
      ]
    });
    alert.present();
  }

  resetPriority() {
    this.apollo.mutate({
      mutation: ResetOutcomesScoreMutation,
    }).subscribe();
    let toast = this.toastCtrl.create({
      message: `Resetting priority for all outcomes.`,
      duration: 2000
    });
    toast.present();

  }

}
