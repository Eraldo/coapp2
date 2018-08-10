import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Icon} from "../../models/icon";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const ViewerQuery = gql`
  query Viewer {
    viewer {
      id
      isAuthenticated
    }
  }
`;

const EnableChatMutation = gql`
  mutation EnableChat($id: String!) {
    enableChat(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage({
  segment: 'portal/:id/:key'
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
  key;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public toastCtrl: ToastController) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.key = this.navParams.get('key');

    this.query$ = this.apollo.watchQuery({
      query: ViewerQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (!data || !data.viewer || !data.viewer.isAuthenticated) {
        this.navCtrl.push('WelcomePage', {redirectUrl: window.location.href})
        return;
      }
      switch (id) {
        case 'unlock-chat': {
          this.unlock_chat();
          break;
        }
      }
    });
  }

  unlock_chat() {
    this.apollo.mutate({
      mutation: EnableChatMutation,
      variables: {id: this.key}
    }).subscribe(({data}) => {
      if (data && data.enableChat && data.enableChat.success) {
        let toast = this.toastCtrl.create({
          message: "I successfully joined the chat.",
          duration: 4000,
          cssClass: 'success'
        });
        toast.present();
      }
      this.message = 'Entered chat portal.';
      this.navCtrl.push('QuestPage');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortalPage');
  }

}
