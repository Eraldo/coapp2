import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the AcademyPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-academy',
  templateUrl: 'academy.html'
})
@IonicPage()
export class AcademyPage {

  coursesRoot = 'CoursesPage'
  bookClubRoot = 'BookClubPage'
  quizzesRoot = 'QuizzesPage'
  resourcesRoot = 'ResourcesPage'


  constructor(public navCtrl: NavController) {}

}
