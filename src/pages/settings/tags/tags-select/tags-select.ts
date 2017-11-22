import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query Query {
    viewer {
      id
      tags {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-tags-select',
  templateUrl: 'tags-select.html',
})
export class TagsSelectPage {
  loading = true;
  query$;
  tags;
  selected;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private apollo: Apollo) {
  }

  ngOnInit() {
    this.selected = this.navParams.get('selected') || [];
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tags = data && data.viewer && data.viewer.tags;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagsSelectPage');
  }

  toggle(id, event) {
    if (event.checked) {
      console.log('check', id);
      this.selected.push(id);
    } else {
      console.log('uncheck', id);
      const index = this.selected.indexOf(id);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
    }
    console.log(this.selected);
  }

  save() {
    this.viewCtrl.dismiss(this.selected);
  }
}
