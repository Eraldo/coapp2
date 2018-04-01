import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";
import {InterviewEntry} from "../../../models/interview";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../../services/date/date";
import {getScopeStart, Scope} from "../../../models/scope";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import moment from "moment";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

const InterviewEntryQuery = gql`
  query InterviewEntry($scope: String!, $start: String!) {
    viewer {
      id
      interviewEntries(scope: $scope, start: $start) {
        edges {
          node {
            id
            scope
            start
            likes
            dislikes
          }
        }
      }
    }
  }
`;

const AddInterviewEntryMutation = gql`
  mutation AddInterviewEntry($scope: Scope!, $start: DateTime!, $likes: String!, $dislikes: String!) {
    addInterviewEntry(input: {scope: $scope, start: $start, likes: $likes, dislikes: $dislikes}) {
      interviewEntry {
        id
        owner {
          id
        }
        scope
        start
        likes
        dislikes
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html',
})
export class InterviewPage {
  query$;
  loading = true;
  entry;
  scope$ = new BehaviorSubject<Scope>(Scope.DAY);
  date$ = new BehaviorSubject<string>(moment().format('YYYY-MM-DD'));
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private dateService: DateService, private apollo: Apollo, private formBuilder: FormBuilder, public popoverCtrl: PopoverController) {
  }

  get scope() {
    return this.scope$.value;
  }

  get start() {
    return getScopeStart(this.scope$.value, this.date$.value)
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      likes: ['', Validators.required],
      dislikes: ['', Validators.required],
    });

    this.query$ = this.apollo.watchQuery({
      query: InterviewEntryQuery,
      variables: {
        scope: this.scope,
        start: this.start
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.entry = data &&
        data.viewer.interviewEntries.edges[0] &&
        data.viewer.interviewEntries.edges[0].node;
    });
    this.scope$.subscribe(scope => this.query$.refetch({scope: this.scope, start: this.start}));
    this.date$.subscribe(date => this.query$.refetch({scope: this.scope, start: this.start}));
  }

  ionViewDidEnter() {
    this.query$.refetch()
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

  save() {
    if (this.form.valid) {
      let entry = this.form.value;
      this.apollo.mutate({
        mutation: AddInterviewEntryMutation,
        variables: {
          scope: this.scope.toUpperCase(),
          start: this.start,
          likes: entry.likes,
          dislikes: entry.dislikes
        }
      }).subscribe(() => {
        this.form.reset();
        this.query$.refetch({scope: this.scope, start: this.start})
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterviewPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('StudioOptionsPage');
    popover.present({ev: source});
  }
}
