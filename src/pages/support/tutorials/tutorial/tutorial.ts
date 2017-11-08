import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";

// const TutorialQuery = gql`
//   query TutorialQuery($id: ID!) {
//     tutorial(id: $id) {
//       id
//       name
//       videoUrl
//       content
//     }
//   }
// `;

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  name;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.name = this.navParams.get('name');
  }

    ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

}
