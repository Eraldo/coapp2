import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {OutcomeService} from "../../services/outcome/outcome";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage {
  @ViewChild('tabs') tabs: Tabs;
  inboxItems$: Observable<number>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private outcomeService: OutcomeService) {
  }

  ngOnInit() {
    this.inboxItems$ = this.outcomeService.inboxOutcomes$.map(outcomes => outcomes.length)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficePage');
  }

  ionViewDidEnter() {
    this.tabs.select(0);
    this.tabs.select(0);
  }

}
