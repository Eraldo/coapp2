import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Tribe} from "../../../models/tribe";
import {TribeService} from "../../../services/tribe/tribe";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-tribes',
  templateUrl: 'tribes.html',
})
export class TribesPage {
  user$: Observable<User>;
  tribe$: Observable<Tribe>;
  tribes$: Observable<Tribe[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private tribeService: TribeService, public popoverCtrl: PopoverController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
    this.tribe$ = this.tribeService.tribe$;
    this.tribes$ = this.tribeService.tribes$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribesPage');
  }

  join(tribe) {
    this.tribeService.joinTribe(tribe.id);
    this.navCtrl.pop()
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Tribe',
      inputs: [
        {
          name: 'name',
          placeholder: 'Tribe name...',
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
                  return this.tribeService.addTribe(name, members)
                }
              );
          }
        }
      ]
    });
    prompt.present();
  }
}
