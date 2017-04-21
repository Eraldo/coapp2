import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user/user";

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage implements OnInit {
  user$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
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
    this.userService.user$.subscribe(console.log)
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
