import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Scope, Scopes} from "../../../models/scope";
import moment from "moment";

const MetricsQuery = gql`
  query Metrics($scope: Scope) {
    metrics {
      users(scope: $scope)
      activeUsers(scope: $scope)
      genderQuote(scope: $scope)
      journalEntries(scope: $scope)
      outcomes(scope: $scope)
      focuses(scope: $scope)
      donations(scope: $scope)
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-metrics',
  templateUrl: 'metrics.html',
})
export class MetricsPage {
  loading = true;
  query$;
  metrics;
  scope$ = new BehaviorSubject<string>(Scope.WEEK.toUpperCase());
  scopes: Scope[] = Scopes;
  date = moment().format('YYYY-MM-DD');

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: MetricsQuery,
      variables: {scope: this.scope$.value}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.metrics = data && data.metrics;
    });
    this.scope$.subscribe(scope => this.query$.refetch({scope}));
  }

  setScope(scope: Scope) {
    this.scope$.next(scope || undefined);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MetricsPage');
  }

}
