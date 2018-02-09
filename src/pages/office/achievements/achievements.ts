import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {DateService} from "../../../services/date/date";
import {ScopeService} from "../../../services/scope/scope";
import moment from "moment";
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";

const Query = gql`
  query Query($start: String!, $end: String!) {
    viewer {
      id
      outcomes(completedAt_Gte: $start, completedAt_Lte: $end) {
        edges {
          node {
            id
            name
            completedAt
          }
        }
      }
      steps(completedAt_Gte: $start, completedAt_Lte: $end) {
        edges {
          node {
            id
            name
            completedAt
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage {
  loading = true;
  query$;
  date$: Observable<string>;
  scope$: Observable<Scope>;
  scopes: Scope[] = Scopes;
  outcomes;
  steps;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, private dateService: DateService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
    this.scope$ = this.scopeService.scope$;
    this.query$ = this.apollo.watchQuery<any>({
      query: Query,
      variables: {
        start: this.dateService.scopedDate$,
        end: this.dateService.scopedEndDate$,
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.outcomes = data && data.viewer.outcomes;
      this.steps= data && data.viewer.steps;
    });
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsPage');
  }

  selectScope() {
    this.scopeService.selectScope();
  }

  setScope(scope: Scope) {
    this.scopeService.setScope(scope);
  }

  selectDate() {
    this.dateService.selectDate();
  }

  next() {
    this.dateService.next()
  }

  previous() {
    this.dateService.previous()
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('OfficeOptionsPage');
    popover.present({ev: source});
  }
}
