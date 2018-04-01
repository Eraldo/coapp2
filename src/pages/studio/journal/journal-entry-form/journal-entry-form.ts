import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JournalEntry} from "../../../../models/journal";
import {ScopeService} from "../../../../services/scope/scope";
import {DateService} from "../../../../services/date/date";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {getScopeStart} from "../../../../models/scope";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {ExperienceQuery} from "../../../../components/app-toolbar/app-toolbar";

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
  mutation AddJournalEntry($scope: Scope!, $start: Date!, $keywords: String, $content: String) {
    addJournalEntry(input: {scope: $scope, start: $start, keywords: $keywords, content: $content}) {
      journalEntry {
        id
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private scopeService: ScopeService, private dateService: DateService, private hotkeysService: HotkeysService) {
    this.id = this.navParams.get('id');

    this.form = this.formBuilder.group({
      id: ['', this.id ? Validators.required : []],
      keywords: ['', [Validators.required, Validators.minLength(4)], ],
      content: [''],
    });
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
    } else {
      this.entry = {};
      const scope = this.navParams.get('scope');
      const date = this.navParams.get('date');
      if (scope && date) {
        this.entry.scope = scope;
        this.entry.start = getScopeStart(scope, date);
        this.loading = false;
      } else {
        console.error('Neither id nor scope and date given for journal entry.')
      }
    }

    this.hotkeysService.add(new Hotkey('mod+s', (event: KeyboardEvent): boolean => {
      this.save();
      return false; // Prevent bubbling
    }, ['INPUT', "TEXTAREA"], 'save'));
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
        }).subscribe();
      } else {
        this.apollo.mutate({
          mutation: AddJournalEntryMutation,
          variables: {
            scope: this.entry.scope.toUpperCase(),
            start: this.entry.start,
            keywords: entry.keywords,
            content: entry.content
          },
          refetchQueries: [{query: ExperienceQuery}]
        }).subscribe();
      }
      this.navCtrl.pop();
    }
  }

  ngOnDestroy() {
    for (const combo of ['mod+s']) {
      const shortcut = this.hotkeysService.get(combo);
      this.hotkeysService.remove(shortcut);
    }
  }
}
