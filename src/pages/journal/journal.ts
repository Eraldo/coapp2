import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the JournalPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
@IonicPage()
export class JournalPage {

  entryRoot = 'EntryPage'
  reflectionRoot = 'ReflectionPage'
  scanRoot = 'ScanPage'
  celebrationRoot = 'CelebrationPage'


  constructor(public navCtrl: NavController) {}

}
