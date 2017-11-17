import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quest',
  templateUrl: 'quest.html',
})
export class QuestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
