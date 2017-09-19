import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage {
  @ViewChild('tabs') tabs: Tabs;
  loading = true;
  query$;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficePage');
  }

  ionViewDidEnter() {
    this.tabs.select(0);
    this.tabs.select(0);
  }

}
