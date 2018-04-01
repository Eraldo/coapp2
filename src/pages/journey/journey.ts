import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";

const Query = gql`
  query {
    tutorialCompleted: hasCheckpoint(name: "journey tutorial")
  }
`;

@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
@IonicPage()
export class JourneyPage {
  query$;
  loading = true;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && !data.tutorialCompleted) {
        this.navCtrl.push('TutorialPage', {name: "journey"})
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyPage');
  }
}
