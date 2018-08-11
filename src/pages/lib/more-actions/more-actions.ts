import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-more-actions',
  templateUrl: 'more-actions.html',
})
export class MoreActionsPage {
  actions;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  ngOnInit() {
    this.actions = this.navParams.get('actions');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreActionsPage');
  }

}
