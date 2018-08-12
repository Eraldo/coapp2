import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";

const UserClanQuery = gql`
  query {
    viewer {
      id
      clan {
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

const UpdateClanMutation = gql`
  mutation UpdateTag($id: ID!, $name: String, $notes: String) {
    updateClan(input: {id: $id, name: $name, notes: $notes}) {
      clan {
        id
        name
        notes
      }
    }
  }
`;

interface QueryResponse {
  viewer: {
    id
    clan: Clan
  }
}

interface Clan {
  name
  members: {
    edges: {
      id
      name
    }[]
  }
}

@IonicPage()
@Component({
  selector: 'page-clan',
  templateUrl: 'clan.html',
})
export class ClanPage {
  loading = true;
  query$;
  clan;
  icons;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
  ) {
    this.icons = Icon;
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<QueryResponse>({query: UserClanQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.clan = data.viewer.clan;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanPage');
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    // this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }


  showProfile(member) {
    this.navCtrl.push('LegendPage', {id: member.id})
  }

  chooseClan() {
    this.navCtrl.push('ClansPage');
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.clan.name
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
            if (name != this.clan.name) {
              this.apollo.mutate({
                mutation: UpdateClanMutation,
                variables: {
                  id: this.clan.id,
                  name: name
                }
              }).subscribe();
            } else {
              // TODO: Show error message: "Name has to be at least 4 characters long."
            }
          }
        }
      ]
    });
    prompt.present();
  }

  updateNotes() {
    const title = 'Clan Notes';
    const content = this.clan.notes;
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateClanMutation,
          variables: {
            id: this.clan.id,
            notes: data.content
          }
        }).subscribe();
      }
    });
    textModal.present();
  }

  openVirtualRoom() {
    this.navCtrl.push('VirtualRoomPage', {name: 'clan', id: this.clan.id});
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ClanOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.refresh())
  }

}
