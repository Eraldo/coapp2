import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../../models/user";
import {ClanService} from "../../../services/clan/clan";
import {UserService} from "../../../services/user/user";
import {Clan} from "../../../models/clan";
import {EmailService} from "../../../services/email/email";

@IonicPage()
@Component({
  selector: 'page-clan',
  templateUrl: 'clan.html',
})
export class ClanPage {
  user$: Observable<User>;
  clan$: Observable<Clan>;
  members$: Observable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private clanService: ClanService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.clan$ = this.clanService.clan$;
    this.members$ = this.clanService.members$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanPage');
  }

  ionViewDidEnter() {
    this.clan$.first().subscribe(clan => {
        if (!clan) {
          this.navCtrl.push('ClansPage')
        }
      }
    )
  }

  showProfile(member) {
    this.navCtrl.push('LegendPage', {id: member.id})
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ClanOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

}
