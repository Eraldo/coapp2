import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Apollo} from "apollo-angular";

@IonicPage()
@Component({
  selector: 'page-metrics',
  templateUrl: 'metrics.html',
})
export class MetricsPage {
  loading = true;
  query$;
  metrics;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    // this.query$ = this.apollo.watchQuery({
    //   query:
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MetricsPage');
  }

}
