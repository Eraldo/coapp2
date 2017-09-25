import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../../../services/user/user";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const LogoutMutation = gql`
  mutation Logout {
    logout(input: {}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-quickadd-options',
  templateUrl: 'quickadd-options.html',
})
export class QuickaddOptionsPage {

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, private apollo: Apollo) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickaddOptionsPage');
  }

  get navCtrl(): NavController {
    return this.app.getActiveNavs()[0];
  }

  addOutcome() {
    this.navCtrl.push('OutcomeFormPage');
    this.viewCtrl.dismiss();
  }
}
