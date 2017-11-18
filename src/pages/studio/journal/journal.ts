import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";
import {Observable} from "rxjs/Observable";
import {JournalEntry} from "../../../models/journal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarkdownService} from "angular2-markdown";
import {DateService} from "../../../services/date/date";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {getScopeStart} from "../../../models/scope";

const JournalEntryQuery = gql`
  query JournalEntry($scope: String!, $start: String!) {
    myUser {
      id
      journalEntries(scope: $scope, start: $start) {
        edges {
          node {
            id
            scope
            start
            keywords
            content
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit {
  query$;
  entry$: Observable<JournalEntry>;
  form: FormGroup;
  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private scopeService: ScopeService, private formBuilder: FormBuilder, private markdownService: MarkdownService, private dateService: DateService) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
    this.form = this.formBuilder.group({
      test: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    Observable.combineLatest(
      this.scopeService.scope$,
      this.dateService.date$,
      (scope, date) => {
        this.query$ = this.apollo.watchQuery({
          query: JournalEntryQuery,
          variables: {scope: scope, start: getScopeStart(scope, date)}
        });
        this.entry$ = this.query$.map(({data, loading}) => {
          this.loading = loading;
          return data &&
            data.myUser.journalEntries.edges[0] &&
            data.myUser.journalEntries.edges[0].node;
        });
      }).subscribe();
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  refresh() {
    this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  edit() {
    this.entry$.first().subscribe(entry => {
      if (entry) {
        this.navCtrl.push('JournalEntryFormPage', {id: entry.id});
      } else {
        this.add()
      }
    });
  }

  add() {
    this.navCtrl.push('JournalEntryFormPage');
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

}
