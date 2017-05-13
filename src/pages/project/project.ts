import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ProjectPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
@IonicPage()
export class ProjectPage {

  aboutRoot = 'AboutPage'
  newsRoot = 'NewsPage'
  eventsRoot = 'EventsPage'
  contactRoot = 'ContactPage'


  constructor(public navCtrl: NavController) {}

}
