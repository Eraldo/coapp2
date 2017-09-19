import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Scope, Scopes} from "../../models/scope";

const MetricsQuery = gql`
  query Metrics($scope: Scope) {
    metrics {
      users(scope: $scope)
      activeUsers(scope: $scope)
      genderQuote(scope: $scope)
      journalEntries(scope: $scope)
      outcomes(scope: $scope)
      focuses(scope: $scope)
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
  scope$ = new BehaviorSubject<Scope>(undefined);
  scopes: Scope[] = Scopes;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: MetricsQuery,
      variables: {scope: this.scope$}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.metrics = data && data.metrics;
      console.log(this.metrics)
    })
  }

  setScope(scope: Scope) {
    this.scope$.next(scope || undefined);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MetricsPage');
  }

}
