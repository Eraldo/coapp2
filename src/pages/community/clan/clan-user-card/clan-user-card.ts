import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user/user";
import {AlertController} from "ionic-angular";
import {EmailService} from "../../../../services/email/email";

@Component({
  selector: 'clan-user-card',
  templateUrl: 'clan-user-card.html'
})
export class ClanUserCardComponent {
  @Input() userId: string;
  user$: Observable<User>;
  currentUser$: Observable<User>;

  constructor(private userService: UserService, public alertCtrl: AlertController, public emailService: EmailService) {
    console.log('Hello ClanUserCardComponent Component');
  }

  ngOnChanges() {
    this.user$ = this.userService.getUserById$(this.userId);
    this.currentUser$= this.userService.user$;
  }

  contact() {
    Observable.combineLatest(this.user$, this.currentUser$, (legend, user) => {
        let prompt = this.alertCtrl.create({
          title: 'Message',
          inputs: [
            {
              name: 'message',
              placeholder: `My message to ${legend.name || legend.username}...`,
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
              text: 'Send',
              handler: data => {
                const email = legend.email;
                const subject = `New message from ${user.name || user.username}`;
                const message = data.message;
                this.emailService.send$(email, subject, message).subscribe()
              }
            }
          ]
        });
        prompt.present();
      }
    ).first().subscribe()
  }

}
