import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query {
    hasTutorial: hasCheckpoint(name: "home tutorial")
  }
`;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  query$;
  loading = true;
  hasTutorial;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.hasTutorial = data && data.hasTutorial;
    })
  }

  completeTutorial() {
    console.log('home tutorial completed')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
