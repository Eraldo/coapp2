import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user/user";
import {FocusService} from "../../services/focus/focus";
import {OutcomeService} from "../../services/outcome/outcome";
import {ExperienceService} from "../../services/experience/experience";
import {Deploy} from "@ionic/cloud-angular";
import {LoadingController, ToastController} from "ionic-angular";
import {Store} from "@ngrx/store";

import * as fromRoot from '../../store/reducers';
import * as layout from '../../store/actions/layout';
import * as community from '../../store/actions/community';
import {DateService} from "../../services/date/date";

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage implements OnInit {
  user$;
  date$;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserService,
              private outcomeService: OutcomeService,
              private focusService: FocusService,
              private experienceService: ExperienceService,
              public alertCtrl: AlertController,
              private readonly deploy: Deploy,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private dateService: DateService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.date$ = this.dateService.date$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

  checkForUpdate() {
    const checking = this.loadingCtrl.create({
      content: 'Checking for update...'
    });
    checking.present();

    this.deploy.check().then((snapshotAvailable: boolean) => {
      checking.dismiss();
      if (snapshotAvailable) {
        this.downloadAndInstall();
      }
      else {
        const toast = this.toastCtrl.create({
          message: 'No update available',
          duration: 3000
        });
        toast.present();
      }
    });
  }

  private downloadAndInstall() {
    const updating = this.loadingCtrl.create({
      content: 'Updating application...'
    });
    updating.present();
    this.deploy.download().then(() => this.deploy.extract()).then(() => this.deploy.load());
  }

  testLogin() {
    const email = 'tester@colegend.com';
    const password = 'tester';
    this.userService.login(email, password);
  }

  logout() {
    this.userService.logout()
    // .subscribe(() => this.navCtrl.setRoot('WelcomePage'));
  }

  test() {
    this.navCtrl.push('JournalEntryFormPage')

    // this.dateService.selectDate();

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
    // this.experienceService.getStatus$().subscribe(console.log);

    // this.store.dispatch(new layout.CloseSidenavAction());

    // this.userService.user$.subscribe(user => {
    //   if (user.duo) {
    //     this.store.dispatch(new community.LoadDuoAction(user.duo));
    //   }
    // })
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
              this.userService.updateUser({name: newName});
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
