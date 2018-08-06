import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {AudioService, Sound} from "../../../services/audio/audio";
import {UpdateAvatarMutation} from "../../community/legend/legend";
import {UserService} from "../../../services/user/user";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public modalCtrl: ModalController,
    public audioService: AudioService,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }
}
