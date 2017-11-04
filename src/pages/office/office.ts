import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-office',
  templateUrl: 'office.html',
})
export class OfficePage {
  loading = true;
  query$;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfficePage');
  }

}
