import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../../models/user";
import {Clan} from "../../../models/clan";
import {UserService} from "../../../services/user/user";
import {TribeService} from "../../../services/tribe/tribe";

@IonicPage()
@Component({
  selector: 'page-tribe',
  templateUrl: 'tribe.html',
})
export class TribePage {
  user$: Observable<User>;
  tribe$: Observable<Clan>;
  members$: Observable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private tribeService: TribeService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.tribe$ = this.tribeService.tribe$;
    this.members$ = this.tribeService.members$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribePage');
  }

  ionViewDidEnter() {
    this.tribe$.first().subscribe(tribe => {
        if (!tribe) {
          this.navCtrl.push('TribesPage')
        }
      }
    )
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('TribeOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

}
