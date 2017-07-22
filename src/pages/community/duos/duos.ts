import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
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
  user$: Observable<User>;
  duo$: Observable<Duo>;
  duos$: Observable<Duo[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private duoService: DuoService, public popoverCtrl: PopoverController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
    this.duo$ = this.duoService.duo$;
    this.duos$ = this.duoService.duos$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuosPage');
  }

  join(duo) {
    this.duoService.joinDuo(duo.id);
    this.navCtrl.pop()
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Duo',
      inputs: [
        {
          name: 'name',
          placeholder: 'Duo name...',
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
                  return this.duoService.addDuo(name, members)
                }
              );
          }
        }
      ]
    });
    prompt.present();
  }
}
