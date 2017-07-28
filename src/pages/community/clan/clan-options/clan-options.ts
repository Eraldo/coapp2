import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../../../services/user/user";
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {ClanService} from "../../../../services/clan/clan";

@IonicPage()
@Component({
  selector: 'page-clan-options',
  templateUrl: 'clan-options.html',
})
export class ClanOptionsPage {
  user$: Observable<User>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private userService: UserService, private clanService: ClanService) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanOptionsPage');
  }

  quit() {
    this.clanService.quitClan();
    this.viewCtrl.dismiss();
  }
}
