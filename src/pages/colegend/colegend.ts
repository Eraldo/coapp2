import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user";
import {UserService} from "../../services/user/user";
import {Deploy} from "@ionic/cloud-angular";

declare function require(moduleName: string): any;
const { version: version } = require('../../../package.json');

@IonicPage()
@Component({
  selector: 'page-colegend',
  templateUrl: 'colegend.html',
})
export class ColegendPage {
  user$: Observable<User>;
  channel = 'production';
  public version: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userService: UserService,
              public alertCtrl: AlertController,
              private readonly deploy: Deploy,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.user$ = this.userService.user$;
    this.version = version;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColegendPage');
  }

  checkForUpdate() {
    const checking = this.loadingCtrl.create({
      content: 'Checking for update...'
    });
    checking.present();

    this.deploy.channel = this.channel;
    this.deploy.check()
      .then((snapshotAvailable: boolean) => {
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
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: error,
          duration: 3000
        });
        toast.present();
      });
  }

  private downloadAndInstall() {
    const updating = this.loadingCtrl.create({
      content: 'Updating application...'
    });
    updating.present();
    this.deploy.download().then(() => this.deploy.extract()).then(() => this.deploy.load());
  }

}
