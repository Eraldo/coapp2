import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import gql from "graphql-tag";

export const AdventuresQuery = gql`
  query Adventures($completed: Boolean, $search: String) {
    adventures(public: true, completed: $completed, search: $search) {
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
  _search$ = new BehaviorSubject<string>(undefined);

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, public menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: AdventuresQuery,
      variables: {
        completed: this._completed$,
        search: this._search$
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.adventures = data && data.adventures;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdventuresPage');
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  showFilters() {
    this.menuCtrl.open('adventures-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('adventures-filter-menu');
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
    this.refresh();
  }

  search(query) {
    this._search$.next(query);
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('ArcadeOptionsPage');
    popover.present({ev: source});
  }
}
