import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {AudioService, Sound} from "../../../services/audio/audio";

const UploadMutation = gql`
  mutation upload($files: Upload) {
    upload(input: {files: $files}) {
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
    public audioService: AudioService
  ) {
  }

  ngOnInit(): void {
  }

  test() {
    this.audioService.play(Sound.SUCCESS)
  }

  testUpload($event) {
    // console.log($event.target.files[0])
    this.apollo.mutate({
      mutation: UploadMutation,
      variables: {files: $event.target.files[0]}
    }).subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }
}
