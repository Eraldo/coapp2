import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../models/icon";

const Query = gql`
  query {
    tutorialCompleted: hasCheckpoint(name: "office tutorial")
  }
`;

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage {
  loading = true;
  query$;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && !data.tutorialCompleted) {
        this.navCtrl.push('TutorialPage', {name: "office"})
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficePage');
  }

}
