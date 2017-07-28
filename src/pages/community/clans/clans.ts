import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Clan} from "../../../models/clan";
import {ClanService} from "../../../services/clan/clan";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-clans',
  templateUrl: 'clans.html',
})
export class ClansPage {
  user$: Observable<User>;
  clan$: Observable<Clan>;
  clans$: Observable<Clan[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private clanService: ClanService, public popoverCtrl: PopoverController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
    this.clan$ = this.clanService.clan$;
    this.clans$ = this.clanService.clans$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClansPage');
  }

  join(clan) {
    this.clanService.joinClan(clan.id);
    this.navCtrl.pop()
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Clan',
      inputs: [
        {
          name: 'name',
          placeholder: 'Clan name...',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const name = data.name;

            this.user$
              .subscribe(user => {
                  const members = [user.id];
                  return this.clanService.addClan(name, members)
                }
              );
          }
        }
      ]
    });
    prompt.present();
  }
}
