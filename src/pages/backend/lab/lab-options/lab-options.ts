import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lab-options',
  templateUrl: 'lab-options.html',
})
export class LabOptionsPage {
  page;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  ngOnInit() {
    this.page = this.navParams.get('page');
  }

  refresh() {
    this.page.refresh();
  }

  showTutorial() {
    this.page.navCtrl.push('TutorialPage', {name: 'Lab'})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabOptionsPage');
  }

}
