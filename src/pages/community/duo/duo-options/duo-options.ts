import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../../../services/user/user";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {DuoService} from "../../../../services/duo/duo";

@IonicPage()
@Component({
  selector: 'page-duo-options',
  templateUrl: 'duo-options.html',
})
export class DuoOptionsPage {
  user$: Observable<User>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private userService: UserService, private duoService: DuoService) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoOptionsPage');
  }

  quit() {
    this.duoService.quitDuo();
    this.viewCtrl.dismiss();
  }
}
