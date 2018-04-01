import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";

const Query = gql`
  query {
    tutorialCompleted: hasCheckpoint(name: "arcade tutorial")
  }
`;

@IonicPage()
@Component({
  selector: 'page-arcade',
  templateUrl: 'arcade.html'
})
export class ArcadePage {
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
        this.navCtrl.push('TutorialPage', {name: "arcade"})
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArcadePage');
  }
}
