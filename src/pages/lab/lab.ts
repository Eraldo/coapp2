import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../services/user/user";

/**
 * Generated class for the LabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage {
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
    this.user$ = userService.user$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

}
