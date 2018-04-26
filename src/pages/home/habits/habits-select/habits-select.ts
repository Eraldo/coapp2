import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../../models/icon";

const HabitsSelectQuery = gql`
  query HabitsSelect {
    viewer {
      id
      habits {
        edges {
          node {
            id
            name
            icon
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-habits-select',
  templateUrl: 'habits-select.html',
})
export class HabitsSelectPage {
  icons = Icon;
  loading = true;
  query$;
  habits;
  selected;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private apollo: Apollo) {
  }

  ngOnInit() {
    this.selected = this.navParams.get('selected') || [];
    this.query$ = this.apollo.watchQuery({query: HabitsSelectQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.habits = data && data.viewer && data.viewer.habits;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitsSelectPage');
  }

  ionViewDidEnter() {
    this.query$.refetch();
  }

  toggle(id, event) {
    if (event.checked) {
      // console.log('check', id);
      this.selected.push(id);
    } else {
      // console.log('uncheck', id);
      const index = this.selected.indexOf(id);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
    }
  }

  save() {
    this.viewCtrl.dismiss(this.selected);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
