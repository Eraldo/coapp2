import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Icon} from "../../models/icon";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query {
    viewer {
      id
      isAuthenticated
      isStaff
      isSuperuser
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-backend',
  templateUrl: 'backend.html',
})
export class BackendPage {
  icons;
  loading = true;
  query$;
  viewer;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.viewer = data.viewer;
    });
  }

  openBackend() {
    window.open('https://www.coLegend.org/backend', '_blank');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BackendPage');
  }

}
