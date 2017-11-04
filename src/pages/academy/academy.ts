import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@Component({
  selector: 'page-academy',
  templateUrl: 'academy.html'
})
@IonicPage()
export class AcademyPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcademyPage');
  }

}
