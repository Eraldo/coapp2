import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";

/**
 * Generated class for the InterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html',
})
export class InterviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService) {
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterviewPage');
  }

}
