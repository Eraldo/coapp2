import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {UserService} from "../../../services/user/user";
import {Observable} from "rxjs/Observable";
import {ANONYMOUS_USER, User} from "../../../models/user";
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
  default_image = ANONYMOUS_USER.image;
  duo$: Observable<Duo>;
  members$: Observable<User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private duoService: DuoService, private alertCtrl: AlertController, private emailService: EmailService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.duo$ = this.user$
      .switchMap(user => this.duoService.getDuo$(user.duo));
    this.members$ = this.duo$
      .switchMap(duo => this.userService.getUsersByIds$(duo.members));
    this.duo$.subscribe(duo => {
      if (!duo) {
        this.navCtrl.push('DuosPage')
      }
    })
  }

  showProfile(member) {
    this.navCtrl.push('LegendPage', {id: member.id})
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
            Observable.combineLatest(this.user$, this.members$, (user, members) => {
              const subject = `New message from ${user.name}`;

              // Find my partner.
              const member = members.filter(member => member.id != user.id)[0];

              return this.emailService.send$(member.email, subject, message)
            })
            // Flatten
              .switchMap(message => message)
              .subscribe(console.log)
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
              .switchMap(user => {
                  const members = [user.id];
                  return this.duoService.createDuo$(name, members)
                }
              ).subscribe();
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('DuoOptionsPage');
    popover.present({ev: source});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoPage');
  }

}
