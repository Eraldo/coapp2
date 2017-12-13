import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import gql from "graphql-tag";

const AdventuresQuery = gql`
  query Adventures($completed: Boolean) {
    adventures(public: true, completed: $completed) {
      edges {
        node {
          id
          name
          scope
          imageUrl
          rating
          completed
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-adventures',
  templateUrl: 'adventures.html',
})
export class AdventuresPage {
  loading = true;
  query$;
  adventures;
  segment = "challenges";
  _completed$ = new BehaviorSubject<boolean>(false);

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, public menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: AdventuresQuery,
      variables: {completed: this._completed$.asObservable()}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.adventures = data && data.adventures;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdventuresPage');
  }
  showFilters() {
    this.menuCtrl.open('books-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('books-filter-menu');
  }

  showSegment(segment) {
    switch (segment) {
      case 'challenges': {
        this._completed$.next(false);
        return;
      }
      case 'completed': {
        this._completed$.next(true);
        return;
      }
    }
  }

  search(query) {
    // this._search$.next(query);
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ArcadeOptionsPage');
    popover.present({ev: source});
  }
}
