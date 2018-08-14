import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const UserDuoQuery = gql`
  query {
    viewer {
      id
      duo {
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

const UpdateDuoMutation = gql`
  mutation UpdateTag($id: ID!, $name: String, $notes: String) {
    updateDuo(input: {id: $id, name: $name, notes: $notes}) {
      duo {
        id
        name
        notes
      }
    }
  }
`;

const QuitDuoMutation = gql`
  mutation {
    quitDuo(input: {}) {
      duo {
        id
        isOpen
        members {
          edges {
            node {
              id
              duo {
                id
              }
            }
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-duo',
  templateUrl: 'duo.html',
})
export class DuoPage implements OnInit {
  query$;
  loading = true;
  duo;
  icons;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<any>({query: UserDuoQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.duo = data.viewer.duo;
    });
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    // this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  chooseDuo() {
    this.navCtrl.push('DuosPage');
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.duo.name
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
            if (name != this.duo.name) {
              this.apollo.mutate({
                mutation: UpdateDuoMutation,
                variables: {
                  id: this.duo.id,
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
    const title = 'Duo Notes';
    const content = this.duo.notes;
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateDuoMutation,
          variables: {
            id: this.duo.id,
            notes: data.content
          }
        }).subscribe();
      }
    });
    textModal.present();
  }

  quit() {
    this.apollo.mutate({
      mutation: QuitDuoMutation
    }).subscribe(() => this.refresh());
  }

  showOptions(event) {
    let options = [
      {
        text: 'Refresh',
        handler: () => {
          this.refresh();
        }
      },
      {
        text: 'All Duos',
        handler: () => {
          this.navCtrl.push('DuosPage');
        }
      },
      {
        text: 'Quit Duo',
        handler: () => {
          this.quit();
        }
      },
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Duo'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }

  openVirtualRoom() {
    this.navCtrl.push('VirtualRoomPage', {name: 'duo', id: this.duo.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoPage');
  }

}
