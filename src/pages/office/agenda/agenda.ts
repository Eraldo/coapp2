import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";
import {Focus} from "../../../models/focus";
import {DateService} from "../../../services/date/date";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const FocusQuery = gql`
  query FocusQuery($scope: String!, $start: String!) {
    user: myUser {
      id
      focuses(scope: $scope, start: $start) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage implements OnInit {
  date$: Observable<string>;
  scope$: Observable<Scope>;
  scopes: Scope[] = Scopes;
  canCreateFocus$: Observable<boolean>;
  query$;
  focus$: Observable<Focus>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, private dateService: DateService) {
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
    this.scope$ = this.scopeService.scope$;
    this.canCreateFocus$ = this.date$.map(date => date >= moment().format('YYYY-MM-DD'))
    // this.focus$ = this.focusService.focus$;
    this.query$ = this.apollo.watchQuery<any>({
      query: FocusQuery,
      variables: {
        scope: this.scopeService.scope$,
        start: this.dateService.scopedDate$,
      }
    });
    this.focus$ = this.query$.map(({data}) => data && data.user.focuses.edges[0] && data.user.focuses.edges[0].node);
  }

  ionViewDidEnter() {
    this.query$.refetch()
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

  update() {
    Observable.zip(this.scope$, this.date$, (scope, date) => {
      const start = date;
      this.navCtrl.push('FocusFormPage', {scope, start});
    }).take(1).subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
  }

}
