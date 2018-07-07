import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {Icon} from "../../../models/icon";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

declare var JitsiMeetExternalAPI: any;

const ViewerQuery = gql`
  query Viewer {
    viewer {
      id
      name
      avatar
      email
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-virtual-room',
  templateUrl: 'virtual-room.html',
})
export class VirtualRoomPage {
  loading = true;
  query$;
  viewer;
  icons;
  name;
  id;
  api;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, private apollo: Apollo, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.name = this.navParams.get('name') || 'lounge';
    this.id = this.navParams.get('id') || 'general';
    this.query$ = this.apollo.watchQuery({
      query: ViewerQuery,
    });
  }

  isMobile() {
    this.plt.is('mobile') || this.plt.is('mobileweb');
  }

  ngAfterViewInit() {
    const domain = "meet.jit.si";
    const roomName = `coLegend-${this.name ? this.name + '-' : ''}${this.id}`;
    const options = {
      roomName,
      parentNode: document.querySelector('#virtual-room'),
      interfaceConfigOverwrite: {
        APP_NAME: 'coLegend',
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        JITSI_WATERMARK_LINK: 'https://www.coLegend.org',
        DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Legend',
        SUPPORT_URL: 'https://www.coLegend.org',
        VIDEO_QUALITY_LABEL_DISABLED: true,
        TOOLBAR_BUTTONS: this.isMobile() ? [
          // main toolbar
          'microphone', 'camera', 'fullscreen', 'fodeviceselection', 'hangup',
        ] : [
          // main toolbar
          'microphone', 'camera', 'fullscreen', 'fodeviceselection', 'hangup',
          // extended toolbar
          'profile', 'contacts', 'chat', 'recording', 'etherpad',
          'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip',
          'invite', 'stats', 'shortcuts'
        ],
        MOBILE_APP_PROMO: false,
      }
    };
    this.api = new JitsiMeetExternalAPI(domain, options);
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.viewer = data && data.viewer;
      this.api.executeCommand('displayName', this.viewer.name);
      this.api.executeCommands({
        email: [this.viewer.email],
        avatarUrl: [this.viewer.avatar]
      });
    });
    this.api.on('videoConferenceLeft', (room) => this.navCtrl.pop());
    this.api.on('videoConferenceJoined', ({displayName}) => {
      let toast = this.toastCtrl.create({
        message: `Welcome ${displayName} to your virtual ${this.name} room.`,
        duration: 4000
      });
      toast.present();

    })
  }

  showAgenda() {
    const title = `${this.name} agenda`;
    const content = 'Some content\nSecond line';
    let textModal = this.modalCtrl.create('TutorialPage', {name: `${this.name} agenda`});
    textModal.onDidDismiss(data => {
    });
    textModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VirtualRoomPage');
  }

}
