import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user/user";

/**
 * Generated class for the LabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage {
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, public alertCtrl: AlertController) {
    this.user$ = userService.user$;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

  testLogin() {
    this.userService.testLogin()
  }

  logout() {
    this.userService.logout()
      .then(() => this.navCtrl.setRoot('LoginPage'));
  }

  getData() {
    // alert(this.user$.value.id);
    this.userService.getUserData(this.user$.value.id);
  }

  updateName() {
    if (this.userService.authenticated) {
      const name = this.user$.value.name;

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
              alert(`=> new name ${data.name}`);
              const newName = data.name;
              if (newName != name) {
                alert(`Old: ${name} - New: ${newName}`);
                this.userService.updateName(newName);
              }
            }
          }
        ]
      });
      prompt.present();
    }
  }
}
