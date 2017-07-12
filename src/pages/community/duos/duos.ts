import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Duo} from "../../../models/duo";
import {DuoService} from "../../../services/duo/duo";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-duos',
  templateUrl: 'duos.html',
})
export class DuosPage {
  duos$: Observable<Duo[]>;
  user$: Observable<User>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private duoService: DuoService, public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
    this.duos$ = this.duoService.getDuos$();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuosPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('LegendOptionsPage');
    popover.present({ev: source});
  }
}
