import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public toastCtrl: ToastController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.name = this.navParams.get('name') || 'room';
    this.id = this.navParams.get('id') || 'lounge';
    this.query$ = this.apollo.watchQuery({
      query: ViewerQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.viewer = data && data.viewer;
    })

  }

  ngAfterViewInit() {
    const domain = "meet.jit.si";
    const options = {
      roomName: `colegend/${this.name ? this.name + '/' : ''}${this.id}`,
      parentNode: document.querySelector('#virtual-room'),
      interfaceConfigOverwrite: {
        APP_NAME: 'colegend',
        // filmStripOnly: true,
        // VERTICAL_FILMSTRIP: true,
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        JITSI_WATERMARK_LINK: 'https://www.colegend.org',
        DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Legend',
        SUPPORT_URL: 'https://www.colegend.org',
        // VIDEO_QUALITY_LABEL_DISABLED: true,
      }
    };
    this.api = new JitsiMeetExternalAPI(domain, options);
    // this.api.executeCommands({
      // displayName: [this.viewer.name],
      // email: [this.viewer.email],
      // avatarUrl: [this.viewer.avatar]
    // });
    // this.api.executeCommand('email', 'tester@colegend.org');
    // this.api.executeCommand('avatarUrl', 'https://avatars0.githubusercontent.com/u/3671647');
    this.api.on('videoConferenceLeft', (room) => this.navCtrl.pop())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VirtualRoomPage');
  }

}
