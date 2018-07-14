import {Component} from '@angular/core';
import {
  AlertController, IonicPage, NavController, NavParams, Platform,
} from 'ionic-angular';
import {Icon} from "../../models/icon";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

declare function require(moduleName: string): any;
const { version: version } = require('../../../package.json');

const MainRoleQuery = gql`
  query MainRole {
    mainRole {
      id
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-colegend',
  templateUrl: 'colegend.html',
})
export class CoLegendPage {
  version: string;
  icons;
  loading = true;
  query$;
  role;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private apollo: Apollo,
              public alertCtrl: AlertController,
              public platform: Platform) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.version = version;
    this.query$ = this.apollo.watchQuery({
      query: MainRoleQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.role = data && data.mainRole;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoLegendPage');
  }

}
