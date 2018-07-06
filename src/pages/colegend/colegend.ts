import {Component} from '@angular/core';
import {
  AlertController, IonicPage, NavController, NavParams, Platform,
} from 'ionic-angular';
import {Icon} from "../../models/icon";

declare function require(moduleName: string): any;
const { version: version } = require('../../../package.json');

@IonicPage()
@Component({
  selector: 'page-colegend',
  templateUrl: 'colegend.html',
})
export class CoLegendPage {
  version: string;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public platform: Platform) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.version = version;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoLegendPage');
  }

}
