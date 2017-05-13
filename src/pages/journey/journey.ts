import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the JourneyPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
@IonicPage()
export class JourneyPage {

  profileRoot = 'ProfilePage'
  chapterRoot = 'ChapterPage'
  storyRoot = 'StoryPage'


  constructor(public navCtrl: NavController) {}

}
