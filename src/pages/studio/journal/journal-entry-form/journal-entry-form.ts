import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JournalEntry} from "../../../../models/journal";
import {ScopeService} from "../../../../services/scope/scope";
import {DateService} from "../../../../services/date/date";
import {MarkdownService} from "angular2-markdown";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Observable} from "rxjs/Observable";
import {getScopeStart} from "../../../../models/scope";

const JournalEntryQuery = gql`
  query JournalEntry($id: ID!) {
    journalEntry(id: $id) {
      id
      scope
      start
      keywords
      content
    }
  }
`;

const AddJournalEntryMutation = gql`
  mutation AddJournalEntry($scope: Scope!, $start: DateTime!, $keywords: String, $content: String) {
    addJournalEntry(input: {scope: $scope, start: $start, keywords: $keywords, content: $content}) {
      journalEntry {
        id
        owner {
          id
          experience(app: STUDIO)
        }
        scope
        start
        keywords
        content
      }
    }
  }
`;

const UpdateJournalEntryMutation = gql`
  mutation UpdateJournalEntry($id: ID!, $keywords: String, $content: String) {
    updateJournalEntry(input: {id: $id, keywords: $keywords, content: $content}) {
      journalEntry {
        id
        owner {
          id
        }
        scope
        start
        keywords
        content
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-journal-entry-form',
  templateUrl: 'journal-entry-form.html',
})
export class JournalEntryFormPage {
  id: string;
  private entry: Partial<JournalEntry>;
  private form: FormGroup;
  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private scopeService: ScopeService, private dateService: DateService, private markdownService: MarkdownService) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});

    const id = this.navParams.get('id');
    this.id = id;

    this.form = this.formBuilder.group({
      id: ['', id ? Validators.required : []],
      content: ['', Validators.required],
      keywords: ['', Validators.required],
    });

    // if (!this.entry.scope) {
    //   this.scopeService.scope$.first().subscribe(scope => this.entry.scope = scope)
    // }
    // if (!this.entry.start) {
    //   this.dateService.date$.first().subscribe(date => this.entry.start = date)
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalEntryFormPage');
  }

  updateContent(content) {
    this.form.patchValue({content});
  }

  ngOnInit() {
    const id = this.id;
    if (id) {
      this.apollo.query<any>({
        query: JournalEntryQuery,
        variables: {id}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        this.entry = data && data.journalEntry || {};
        this.form.patchValue(this.entry)
      });
    }
  }

  save() {
    if (this.form.valid) {
      const entry = this.form.value;
      if (entry.id) {
        this.apollo.mutate({
          mutation: UpdateJournalEntryMutation,
          variables: {
            id: entry.id,
            keywords: entry.keywords,
            content: entry.content
          }
        })
      } else {
        Observable.combineLatest(
          this.scopeService.scope$,
          this.dateService.date$,
          (scope, date) => {
            this.apollo.mutate({
              mutation: AddJournalEntryMutation,
              variables: {
                scope: scope.toUpperCase(),
                start: getScopeStart(scope, date),
                keywords: entry.keywords,
                content: entry.content
              },
            }).subscribe()
          }
        ).first().subscribe()
      }
      this.navCtrl.pop();
    }
  }

}
