import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user/user";
import {FocusService} from "../../services/focus/focus";
import {Scope} from "../../models/scope";
// import moment from "moment";
import {OutcomeService} from "../../services/outcome/outcome";
import {Status} from "../../models/status";

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage implements OnInit {
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private outcomeService: OutcomeService, private focusService: FocusService, public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

  testLogin() {
    const email = 'tester@colegend.com';
    const password = 'tester';
    this.userService.login(email, password);
  }

  logout() {
    this.userService.logout()
      .then(() => this.navCtrl.setRoot('LoginPage'));
  }

  test() {
    // const email = 'tester6@colegend.com';
    // const password = 'tester';
    // this.userService.join(email, password).subscribe(console.log, console.error)

    // this.userService.loginWithGoogle()

    // const scope = Scope.DAY;
    // const start = moment().format('YYYY-MM-DD');
    // this.focusService.getFocus$(scope, start).switchMap(focus_set => {
    //   if (focus_set) {
    //     const focus = focus_set[0];
    //     let outcome_key = focus.outcome_1;
    //     if (outcome_key) {
    //       const result = this.outcomeService.getOutcome$(outcome_key);
    //       return result;
    //     }
    //   }
    // })
    //   .subscribe(console.log)
    // ;

    this.outcomeService.getOutcomes$(Status.OPEN, Scope.WEEK).subscribe(console.log)
  }

  updateName() {
    let name = '';
    this.user$.take(1).subscribe(user => name = user.name);

    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: name
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
            const newName = data.name;
            if (newName != name) {
              this.userService.updateName(newName);
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
