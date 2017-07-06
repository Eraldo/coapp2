import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private clanService: ClanService, private alertCtrl: AlertController, private emailService: EmailService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.clan$ = this.user$
      .switchMap(user => this.clanService.getClan$(user.clan));
    this.members$ = this.clan$
      .switchMap(clan => this.userService.getUsersByIds$(clan.members))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClanPage');
  }

  showProfile(member) {
    this.navCtrl.push('LegendPage', {id: member.id})
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
