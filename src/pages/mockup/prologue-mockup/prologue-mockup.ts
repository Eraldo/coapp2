import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";

@IonicPage()
@Component({
  selector: 'page-prologue-mockup',
  templateUrl: 'prologue-mockup.html',
})
export class PrologueMockupPage implements OnInit {

  country;
  weekday: string;
  time_of_day: string;
  typed_username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    // this.country = 'Germany';
    this.weekday = moment().format('dddd');
    console.log(this.weekday);
    this.time_of_day = this.getTimeOfDay();
    this.typed_username = this.getTypedUsername();
  }

  private getTimeOfDay() {
    let hour = moment().hour();
    console.log(hour);
    if (hour > 4 && hour < 12) { // 5-11 (7h)
      return 'morning';
    } else if (hour > 11 && hour < 18) { // 12-17 (6h)
      return 'afternoon';
    } else if (hour > 17 && hour < 23) { // 18-22 (5h)
      return 'evening';
    } else { // 23-4 (6h)
      return 'night';
    }
  }

  private getTypedUsername() {
    // TODO: Getting real username.
    const username = 'eraldo';
    let capitalUsername = username[0].toUpperCase() + username.substr(1);
    // Spread pauses in between characters for dramatic effect. :D
    const typedUsername = capitalUsername.split('').join('<pause ms="400">');
    return typedUsername
  }
//   def get_typed_username(self):
//    username = self.request.user.username.title()
//    typed_username = '^400'.join(username)
//    return typed_username

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrologueMockupPage');
  }
}
