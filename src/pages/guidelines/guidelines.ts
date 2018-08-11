import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Icon} from "../../models/icon";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {AudioService, Sound} from "../../services/audio/audio";


const GuidelinesQuery = gql`
  query Guidelines {
    hasCheckpoint(name: "guidelines accepted")
  }
`;

const AcceptGuidelinesMutation = gql`
  mutation AcceptGuidelines {
    acceptGuidelines(input: {}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-guidelines',
  templateUrl: 'guidelines.html',
})
export class GuidelinesPage {
  icons;
  loading = true;
  query$;
  accepted = false;
  rule1 = false;
  rule2 = false;
  rule3 = false;
  rule4 = false;
  rule5 = false;
  rule6 = false;
  rule7 = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public toastCtrl: ToastController,
    public audioService: AudioService,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
    const accepted = this.navParams.get('accepted');
    if (!accepted) {
      this.query$ = this.apollo.watchQuery({
        query: GuidelinesQuery
      });
      this.query$.valueChanges.subscribe(({data, loading}) => {
        this.loading = loading;
        this.accepted = data && data.hasCheckpoint;
        if (this.accepted) {
          this.rule1 = true;
          this.rule2 = true;
          this.rule3 = true;
          this.rule4 = true;
          this.rule5 = true;
          this.rule6 = true;
          this.rule7 = true;
        }
      })
    }
  }

  get valid() {
    return this.rule1 &&
      this.rule2 &&
      this.rule3 &&
      this.rule4 &&
      this.rule5 &&
      this.rule6 &&
      this.rule7;
  }

  save() {
    this.apollo.mutate({
      mutation: AcceptGuidelinesMutation,
    }).subscribe(({data}) => {
      if (data && data.acceptGuidelines && data.acceptGuidelines.success) {
        let toast = this.toastCtrl.create({
          message: "I successfully accepted the community guidelines.",
          duration: 2000
        });
        toast.present();
        this.audioService.play(Sound.ACHIEVEMENT);
      }
      this.navCtrl.pop();
      this.query$.refetch();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuidelinesPage');
  }

}
