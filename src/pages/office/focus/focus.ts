import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const FocusQuery = gql`
  query UserFocus($id: ID!) {
    focus(id: $id) {
      id
      scope
      start
      owner {
        id
      }
      outcome1 {
        id
        name
        status
      }
      outcome2 {
        id
        name
        status
      }
      outcome3 {
        id
        name
        status
      }
      outcome4 {
        id
        name
        status
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-focus',
  templateUrl: 'focus.html',
})
export class FocusPage {
  query$;
  loading = true;
  focus = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit(): void {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({query: FocusQuery, variables: {id}});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.focus = data.focus;
    })
  }

  ionViewDidEnter() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FocusPage');
  }

}
