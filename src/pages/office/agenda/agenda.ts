import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import moment from "moment";
import {getScopeEnd, getScopeStart, Scope, Scopes} from "../../../models/scope";
import {ScopeService} from "../../../services/scope/scope";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ScopedDatePickerComponent} from "../../../components/scoped-date-picker/scoped-date-picker";
import {Status} from "../../../models/status";
import {SetFocusMutation} from "./focus-form/focus-form";
import {ExperienceQuery} from "../../../components/app-toolbar/app-toolbar";

const FocusQuery = gql`
  query FocusQuery($scope: String!, $start: Date!, $end: Date!) {
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
      overdueOutcomes: outcomes(deadline_Lt: $start, open: true) {
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
  @ViewChild(ScopedDatePickerComponent) scopedDatePicker: ScopedDatePickerComponent;
  loading = true;
  query$;
  date$ = new BehaviorSubject<string>(moment().format('YYYY-MM-DD'));
  scope$ = new BehaviorSubject<Scope>(Scope.DAY);
  scopes: Scope[] = Scopes;
  focus;
  scheduledOutcomes;
  dueOutcomes;
  overdueOutcomes;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, public popoverCtrl: PopoverController, private modalCtrl: ModalController) {
    this.icons = Icon;
  }

  get scope() {
    return this.scope$.value;
  }

  get start() {
    return getScopeStart(this.scope$.value, this.date$.value)
  }

  get end() {
    return getScopeEnd(this.scope$.value, this.date$.value)
  }

  get canCreateFocus() {
    return this.date$.value >= moment().format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<any>({
      query: FocusQuery,
      variables: {
        scope: this.scope,
        start: this.start,
        end: this.end,
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && data.user) {
        this.scheduledOutcomes = data.user.scheduledOutcomes;
        this.dueOutcomes = data.user.dueOutcomes;
        this.overdueOutcomes = data.user.overdueOutcomes;
        this.focus = data.user.focuses.edges[0] && data.user.focuses.edges[0].node;
      }
    });
    this.scope$.subscribe(scope => this.query$.refetch({scope: this.scope, start: this.start, end: this.end}));
    this.date$.subscribe(date => this.query$.refetch({scope: this.scope, start: this.start, end: this.end}));
  }

  ionViewDidEnter() {
    this.refresh();
    this.scopedDatePicker.setShortcuts();
  }

  refresh() {
    this.query$.refetch();
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

  setFocus() {
    const status = Status.CURRENT;
    let modal = this.modalCtrl.create('OutcomeSelectPage', {status, multiple: true, selectMin: 1, selectMax: 4});
    modal.onDidDismiss(ids => {
      if (ids) {
        // Creating new Focus.
        const outcomes = ids;
        const scope = this.scope.toUpperCase();
        const start = this.start;
        const focus = {scope, start, outcomes};
        this.apollo.mutate({
          mutation: SetFocusMutation,
          variables: focus,
          refetchQueries: [{query: ExperienceQuery}]
        }).subscribe(() => this.refresh());
      }
    });
    modal.present();
  }

  update() {
    this.navCtrl.push('FocusFormPage', {
      scope: this.scope$.value,
      start: this.start
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('OfficeOptionsPage');
    popover.present({ev: source});
  }

  ionViewDidLeave() {
    this.scopedDatePicker.removeShortcuts();
  }
}
