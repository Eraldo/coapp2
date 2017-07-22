import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {UserService} from "../../../services/user/user";
import {Observable} from "rxjs/Observable";
import {User} from "../../../models/user";
import {Duo} from "../../../models/duo";
import {DuoService} from "../../../services/duo/duo";
import {EmailService} from "../../../services/email/email";

@IonicPage()
@Component({
  selector: 'page-duo',
  templateUrl: 'duo.html',
})
export class DuoPage implements OnInit {
  user$: Observable<User>;
  duo$: Observable<Duo>;
  members$: Observable<User[]>;
  partner$: Observable<User>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private duoService: DuoService, private alertCtrl: AlertController, private emailService: EmailService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.duo$ = this.duoService.duo$;
    this.members$ = this.duoService.members$;
    this.partner$ = this.duoService.partner$;
  }

  ionViewDidEnter() {
    this.duo$.take(1).subscribe(duo => {
        if (!duo) {
          this.navCtrl.push('DuosPage')
        }
      }
    )
  }

  contact() {
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
            const message = data.message;

            // TODO: Refactoring!! Hackery code smell.
            Observable.combineLatest(this.user$, (this.partner$), (user, partner) => {
              const subject = `New message from ${user.name}`;
              return this.emailService.send$(partner.email, subject, message)
            })
            // Flatten
              .switchMap(message$ => message$)
              .subscribe()
          }
        }
      ]
    });
    prompt.present();
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

  showOptions(source) {
    let popover = this.popoverCtrl.create('DuoOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoPage');
  }

}
