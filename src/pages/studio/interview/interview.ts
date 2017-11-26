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

const InterviewEntryQuery = gql`
  query InterviewEntry($scope: String!, $start: String!) {
    myUser {
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
  entry$: Observable<InterviewEntry>;
  scope$: Observable<Scope>;
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private dateService: DateService, private apollo: Apollo, private formBuilder: FormBuilder, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    // this.entry$ = this.interviewService.entry$;
    this.scope$ = this.scopeService.scope$;

    this.form = this.formBuilder.group({
      likes: ['', Validators.required],
      dislikes: ['', Validators.required],
    });

    Observable.combineLatest(
      this.scopeService.scope$,
      this.dateService.date$,
      (scope, date) => {
        this.query$ = this.apollo.watchQuery({
          query: InterviewEntryQuery,
          variables: {
            scope: scope,
            start: getScopeStart(scope, date)
          }
        });
        this.entry$ = this.query$.map(({data, loading}) => {
          this.loading = loading;
          return data &&
            data.myUser.interviewEntries.edges[0] &&
            data.myUser.interviewEntries.edges[0].node;
        });
      }).subscribe();
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  save() {
    if (this.form.valid) {
      let entry = this.form.value;
      console.log(entry);
      Observable.combineLatest(
        this.scopeService.scope$,
        this.dateService.date$,
        (scope, date) => {
          this.apollo.mutate({
            mutation: AddInterviewEntryMutation,
            variables: {
              scope: scope.toUpperCase(),
              start: getScopeStart(scope, date),
              likes: entry.likes,
              dislikes: entry.dislikes
            }
          }).subscribe(() => {
            this.form.reset();
            this.query$.refetch();
          })
        }
      ).first().subscribe()
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
