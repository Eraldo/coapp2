import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
  selector: 'page-legend-options',
  templateUrl: 'legend-options.html',
})
export class LegendOptionsPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegendOptionsPage');
  }

  logout() {
    this.apollo.mutate<any>({mutation: LogoutMutation})
      .subscribe(({data}) => {
        if (data.logout.success) {
          localStorage.removeItem('token');
          // this.apollo.getClient().resetStore();
          this.viewCtrl.dismiss();
          this.navCtrl.push('WelcomePage');
        } else {
          // TODO: Informing user about error.
        }
      });
  }
}
