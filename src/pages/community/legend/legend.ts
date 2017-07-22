import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {ANONYMOUS_USER, User} from "../../../models/user";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-legend',
  templateUrl: 'legend.html',
})
export class LegendPage {
  user$: Observable<User>;
  currentUser$: Observable<User>;
  default_image = ANONYMOUS_USER.image;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.userService.user$;
    const id = this.navParams.get('id');
    if (id) {
      this.user$ = this.userService.getUserById$(id);
    } else {
      this.user$ = this.currentUser$;
    }
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('LegendOptionsPage');
    popover.present({ev: source});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendPage');
  }

}
