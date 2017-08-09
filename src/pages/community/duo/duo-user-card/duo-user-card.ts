import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user/user";
import {Focus} from "../../../../models/focus";
import {FocusService} from "../../../../services/focus/focus";
import {Scope} from "../../../../models/scope";
import moment from "moment";
import {AlertController} from "ionic-angular";
import {EmailService} from "../../../../services/email/email";

@Component({
  selector: 'duo-user-card',
  templateUrl: 'duo-user-card.html'
})
export class DuoUserCardComponent {
  @Input() userId: string;
  user$: Observable<User>;
  currentUser$: Observable<User>;
  focus$: Observable<Focus>;

  constructor(public userService: UserService, public focusService: FocusService, public alertCtrl: AlertController, public emailService: EmailService) {
    console.log('Hello DuoUserCardComponent Component');
  }

  ngOnChanges() {
    this.user$ = this.userService.getUserById$(this.userId);
    this.currentUser$ = this.userService.user$;
    this.focus$ = this.focusService.getFocus$({
      owner: this.userId,
      scope: Scope.DAY,
      start: moment().format('YYYY-MM-DD')
    });
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
