import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {AudioService, Sound} from "../../../services/audio/audio";
import {UpdateAvatarMutation} from "../../community/legend/legend";
import {UserService} from "../../../services/user/user";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const UploadMutation = gql`
  mutation upload($file: Upload, $file2: Upload) {
    upload(input: {file: $file, file2: $file2}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage implements OnInit {
  icons;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public modalCtrl: ModalController,
    public audioService: AudioService,
    public userService: UserService,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  ngOnInit(): void {
  }

  refresh() {
    this.test();
  }

  test() {
    this.audioService.play(Sound.SUCCESS)
  }

  testUpload($event) {
    const file = $event.target.files[0];
    console.log(file);
    this.apollo.mutate({
      mutation: UpdateAvatarMutation,
      variables: {avatar: file}
    }).subscribe();
  }

  showOptions1(event) {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Refresh',
          handler: () => {
            this.refresh();
          }
        },
        {
          text: 'Show tutorial',
          handler: () => {
            this.navCtrl.push('TutorialPage', {name: 'Lab'})
          }
        },
      ]
    });
    actionSheet.present();
  }

  showOptions2(event) {
    let actions = [
      {
        text: 'Refresh',
        handler: () => {
          this.refresh();
        }
      },
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Lab'})
        }
      },
    ];
    this.optionsMenuService.showOptions(actions, event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }
}
