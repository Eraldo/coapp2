import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../../../services/user/user";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {TribeService} from "../../../../services/tribe/tribe";

@IonicPage()
@Component({
  selector: 'page-tribe-options',
  templateUrl: 'tribe-options.html',
})
export class TribeOptionsPage {
  user$: Observable<User>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private userService: UserService, private tribeService: TribeService) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribeOptionsPage');
  }

  quit() {
    this.tribeService.quitTribe();
    this.viewCtrl.dismiss();
  }
}
