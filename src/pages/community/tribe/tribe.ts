import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../../models/user";
import {Clan} from "../../../models/clan";
import {UserService} from "../../../services/user/user";
import {TribeService} from "../../../services/tribe/tribe";
import {EmailService} from "../../../services/email/email";

@IonicPage()
@Component({
  selector: 'page-tribe',
  templateUrl: 'tribe.html',
})
export class TribePage {
  user$: Observable<User>;
  tribe$: Observable<Clan>;
  members$: Observable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private tribeService: TribeService, private alertCtrl: AlertController, private emailService: EmailService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.tribe$ = this.user$
      .switchMap(user => this.tribeService.getTribe$(user.tribe));
    this.members$ = this.tribe$
      .switchMap(tribe => this.userService.getUsersByIds$(tribe.members))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribePage');
  }

  contact(member) {
    this.user$.subscribe(user => {

        let prompt = this.alertCtrl.create({
          title: 'Message',
          inputs: [
            {
              name: 'message',
              placeholder: 'My message...',
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
                const email = member.email;
                const subject = `New message from ${user.name}`;
                const message = data.message;
                this.emailService.send$(email, subject, message).subscribe()
              }
            }
          ]
        });
        prompt.present();
      }
    )
  }
}
