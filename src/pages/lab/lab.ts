import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user/user";
import {FocusService} from "../../services/focus/focus";
// import {Scope} from "../../models/scope";
// import moment from "moment";
import {OutcomeService} from "../../services/outcome/outcome";
import {ExperienceService} from "../../services/experience/experience";
// import {Observable} from "rxjs/Observable";
// import {Status} from "../../models/status";

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage implements OnInit {
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private outcomeService: OutcomeService, private focusService: FocusService, private experienceService: ExperienceService, public alertCtrl: AlertController) {
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
    this.userService.login$(email, password).subscribe();
  }

  logout() {
    this.userService.logout()
      .then(() => this.navCtrl.setRoot('WelcomePage'));
  }

  test() {
    // const email = 'tester6@colegend.com';
    // const password = 'tester';
    // this.userService.join(email, password).subscribe(console.log, console.error)

    // this.userService.loginWithGoogle()

    // const scope = Scope.DAY;
    // const start = moment().format('YYYY-MM-DD');
    // this.focusService.getFocus$(scope, start)
    //   .subscribe(console.log);

    // this.outcomeService.getOutcomes$(Status.OPEN, Scope.WEEK).subscribe(console.log)

    // this.experienceService.getExperience$().subscribe(console.log);
    // this.experienceService.getLevel$().subscribe(console.log);
    this.experienceService.getStatus$().subscribe(console.log);
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
              this.userService.updateUser$({name: newName}).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
