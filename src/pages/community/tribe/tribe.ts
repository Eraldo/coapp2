import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";

const UserTribeQuery = gql`
  query {
    viewer {
      id
      tribe {
        id
        name
        notes
        members {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const UpdateTribeMutation = gql`
  mutation UpdateTag($id: ID!, $name: String, $notes: String) {
    updateTribe(input: {id: $id, name: $name, notes: $notes}) {
      tribe {
        id
        name
        notes
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-tribe',
  templateUrl: 'tribe.html',
})
export class TribePage {
  query$;
  loading = true;
  tribe;
  icons;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
  ) {
    this.icons = Icon;
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery({query: UserTribeQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tribe = data.viewer.tribe;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribePage');
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    // this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  chooseTribe() {
    this.navCtrl.push('TribesPage');
  }

  openVirtualRoom() {
    this.navCtrl.push('VirtualRoomPage', {name: 'tribe', id: this.tribe.id});
  }

  updateNotes() {
    const title = 'Tribe Notes';
    const content = this.tribe.notes;
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateTribeMutation,
          variables: {
            id: this.tribe.id,
            notes: data.content
          }
        }).subscribe();
      }
    });
    textModal.present();
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('TribeOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.refresh())
  }

}
