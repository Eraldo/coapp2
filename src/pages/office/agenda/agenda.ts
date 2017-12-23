import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import moment from "moment";
import {Scope, Scopes} from "../../../models/scope";
import {Observable} from "rxjs/Observable";
import {ScopeService} from "../../../services/scope/scope";
import {Focus} from "../../../models/focus";
import {DateService} from "../../../services/date/date";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const FocusQuery = gql`
  query FocusQuery($scope: String!, $start: String!, $end: String!) {
    user: viewer {
      id
      focuses(scope: $scope, start: $start) {
        edges {
          node {
            id
          }
        }
      }
      scheduledOutcomes: outcomes(date_Gte: $start, date_Lte: $end) {
        edges {
          node {
            id
            name
          }
        }
      }
      dueOutcomes: outcomes(deadline_Gte: $start, deadline_Lte: $end) {
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
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage implements OnInit {
  loading = true;
  query$;
  date$: Observable<string>;
  scope$: Observable<Scope>;
  scopes: Scope[] = Scopes;
  canCreateFocus$: Observable<boolean>;
  focus$: Observable<Focus>;
  scheduledOutcomes;
  dueOutcomes;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, private dateService: DateService, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
    this.scope$ = this.scopeService.scope$;
    this.canCreateFocus$ = this.date$.map(date => date >= moment().format('YYYY-MM-DD'));
    this.query$ = this.apollo.watchQuery<any>({
      query: FocusQuery,
      variables: {
        scope: this.scopeService.scope$,
        start: this.dateService.scopedDate$,
        end: this.dateService.scopedEndDate$,
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.scheduledOutcomes = data && data.user.scheduledOutcomes;
      this.dueOutcomes = data && data.user.dueOutcomes;
    });
    this.focus$ = this.query$.map(({data}) => data && data.user.focuses.edges[0] && data.user.focuses.edges[0].node);
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
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

  showOptions(source) {
    let popover = this.popoverCtrl.create('OfficeOptionsPage');
    popover.present({ev: source});
  }
}
