import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {DateService} from "../../../services/date/date";
import {ScopeService} from "../../../services/scope/scope";
import moment from "moment";
import {getScopeEnd, getScopeStart, Scope, Scopes} from "../../../models/scope";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Icon} from "../../../models/icon";

const CompletedOutcomesAndStepsQuery = gql`
  query CompletedOutcomesAndSteps($start: DateTime!, $end: DateTime!) {
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
            outcome {
              id
            }
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
  date$ = new BehaviorSubject<string>(moment().format('YYYY-MM-DD'));
  scope$ = new BehaviorSubject<Scope>(Scope.DAY);
  scopes: Scope[] = Scopes;
  outcomes;
  steps;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, private dateService: DateService, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  get scope() {
    return this.scope$.value;
  }

  get start() {
    return getScopeStart(this.scope$.value, this.date$.value);
  }

  get end() {
    // Offset needed for query: e.g. between 2018-01-01 and 2018-01-01 does not make sense.
    return moment(getScopeEnd(this.scope$.value, this.date$.value)).add(1, 'days').format('YYYY-MM-DD');
  }

  get startDateTime() {
    return moment(this.start).format()
  }

  get endDateTime() {
    return moment(this.end).format()
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<any>({
      query: CompletedOutcomesAndStepsQuery,
      variables: {
        start: this.startDateTime,
        end: this.endDateTime,
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.outcomes = data && data.viewer.outcomes;
      this.steps = data && data.viewer.steps;
    });
    this.scope$.subscribe(scope => this.query$.refetch({
      start: this.startDateTime,
      end: this.endDateTime
    }));
    this.date$.subscribe(date => this.query$.refetch({
      start: this.startDateTime,
      end: this.endDateTime
    }));
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.query$.refetch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsPage');
  }

  selectScope() {
    this.scopeService.selectScope(this.scope).then(scope => this.scope$.next(scope), console.log);
  }

  setScope(scope: Scope) {
    this.scope$.next(scope);
  }

  setDate(date: string) {
    this.date$.next(date);
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('OfficeOptionsPage');
    popover.present({ev: source});
  }
}
