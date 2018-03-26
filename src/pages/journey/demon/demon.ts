import {Component} from '@angular/core';
import {
  AlertController, Icon, IonicPage, ModalController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {titleCase} from "../../../utils/utils";

const ViewerDemonQuery = gql`
  query {
    viewer {
      id
      demon {
        id
        name
        avatar
        tensions
        fears
        content
        modified
      }
    }
  }
`;

const UpdateDemonMutation = gql`
  mutation updateDemon($name: String, $avatar: String, $tensions: String, $fears: String, $content: String) {
    updateDemon(input: {name: $name, avatar: $avatar, tensions: $tensions, fears: $fears, content: $content}) {
      demon {
        id
        name
        avatar
        tensions
        fears
        content
        modified
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-demon',
  templateUrl: 'demon.html',
})
export class DemonPage {
  query$;
  loading = true;
  demon;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: ViewerDemonQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.demon = data && data.viewer && data.viewer.demon
    });
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  updateAvatar() {
    let prompt = this.alertCtrl.create({
      title: 'Avatar',
      inputs: [
        {
          name: 'avatar',
          placeholder: 'Image url',
          value: this.demon.avatar,
          type: 'url'
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
            const avatar = data.avatar;
            if (avatar && avatar != this.demon.avatar) {
              this.apollo.mutate({
                mutation: UpdateDemonMutation,
                variables: {avatar}
              }).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.demon.name
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
            if (name && name != this.demon.name) {
              this.apollo.mutate({
                mutation: UpdateDemonMutation,
                variables: {name}
              }).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  update(field, label='') {
    const title = titleCase(label || field);
    const content = this.demon[field];
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        let variables = {};
        variables[field] = data.content;
        this.apollo.mutate({
          mutation: UpdateDemonMutation,
          variables
        }).subscribe();
      }
    });
    textModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemonPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('JourneyOptionsPage');
    popover.present({ev: source});
  }
}
