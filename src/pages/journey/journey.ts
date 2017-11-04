import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
@IonicPage()
export class JourneyPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyPage');
  }

}
