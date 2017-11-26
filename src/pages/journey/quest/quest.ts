import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";

@IonicPage()
@Component({
  selector: 'page-quest',
  templateUrl: 'quest.html',
})
export class QuestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestPage');
  }

  openQuest() {
    this.navCtrl.push('ProloguePage')
  }

  tutorialInfo() {
    this.navCtrl.push('TutorialsPage');
  }

  journeyInfo() {
    this.navCtrl.push('MentorPage');
  }

  communityInfo() {
    this.navCtrl.push('TribePage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('JourneyOptionsPage');
    popover.present({ev: source});
  }
}
