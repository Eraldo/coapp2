import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Icon} from "../../models/icon";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const ViewerQuery = gql`
  query Viewer {
    viewer {
      id
    }
  }
`;

const EnableChatMutation = gql`
  mutation EnableChat {
    enableChat(input: {}) {
      success
    }
  }
`;

@IonicPage({
  segment: 'portal/:id'
})
@Component({
  selector: 'page-portal',
  templateUrl: 'portal.html',
})
export class PortalPage {
  icons;
  loading = true;
  query$;
  message = 'Entering portal...';

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public toastCtrl: ToastController) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.query({
      query: ViewerQuery,
    }).subscribe(() => {
      switch (id) {
        case 'unlock-chat': {
          this.apollo.mutate({
            mutation: EnableChatMutation,
          }).subscribe(() => {
            let toast = this.toastCtrl.create({
              message: "I successfully joined the chat.",
              duration: 2000,
              cssClass: 'success'
            });
            toast.present();
            this.message = 'Entered chat portal.';
            this.navCtrl.push('QuestPage');
          });
          break;
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortalPage');
  }

}
