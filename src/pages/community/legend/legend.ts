import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {ANONYMOUS_USER, User} from "../../../models/user";
import {UserService} from "../../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-legend',
  templateUrl: 'legend.html',
})
export class LegendPage {
  user$: Observable<User>;
  currentUser$: Observable<User>;
  default_image = ANONYMOUS_USER.image;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.userService.user$;
    const id = this.navParams.get('id');
    if (id) {
      this.user$ = this.userService.getUserById$(id);
    } else {
      this.user$ = this.currentUser$;
    }
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('LegendOptionsPage');
    popover.present({ev: source});
  }

  updateName() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Name',
          inputs: [
            {
              name: 'name',
              placeholder: 'Name',
              value: user.name
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
                if (name && name.length >= 4) {
                  this.userService.updateUser({name});
                } else {
                  // TODO: Show error message: "Name has to be at least 4 characters long."
                }
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  updateUsername() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Username',
          inputs: [
            {
              name: 'username',
              placeholder: 'Username',
              value: user.username
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
                const username = data.username;
                if (username && username.length >= 4) {
                  this.userService.updateUser({username});
                } else {
                  // TODO: Show error message: "Username has to be at least 4 characters long."
                }
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  updatePurpose() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Purpose',
          inputs: [
            {
              name: 'purpose',
              placeholder: 'Purpose',
              value: user.purpose
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
                const purpose = data.purpose;
                if (purpose && purpose.length >= 4) {
                  this.userService.updateUser({purpose});
                } else {
                  // TODO: Show error message: "Purpose has to be at least 4 characters long."
                }
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  updateGender() {
    Observable.combineLatest(this.currentUser$, this.user$, (user, legend) => {
      if (user.id == legend.id) {
        let prompt = this.alertCtrl.create({
          title: 'Gender',
          inputs: [
            {
              type: 'radio',
              label: 'Male',
              value: 'M',
              checked: user.gender == 'M'
            },
            {
              type: 'radio',
              label: 'Female',
              value: 'F',
              checked: user.gender == 'F'
            },
            {
              type: 'radio',
              label: 'Neutral',
              value: 'N',
              checked: user.gender == 'N'
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
                const gender = data;
                  this.userService.updateUser({gender});
              }
            }
          ]
        });
        prompt.present();
      }
    }).first().subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendPage');
  }

}
