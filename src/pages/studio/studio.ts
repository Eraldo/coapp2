import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query {
    tutorialCompleted: hasCheckpoint(name: "studio tutorial")
  }
`;

@Component({
  selector: 'page-studio',
  templateUrl: 'studio.html'
})
@IonicPage()
export class StudioPage {
  query$;
  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && !data.tutorialCompleted) {
        this.navCtrl.push('TutorialPage', {name: "studio"})
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudioPage');
  }

}

