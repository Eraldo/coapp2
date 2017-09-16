import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JournalEntry} from "../../../../models/journal";
import {JournalService} from "../../../../services/journal/journal";
import {ScopeService} from "../../../../services/scope/scope";
import {DateService} from "../../../../services/date/date";
import {MarkdownService} from "angular2-markdown";

@IonicPage()
@Component({
  selector: 'page-journal-entry-form',
  templateUrl: 'journal-entry-form.html',
})
export class JournalEntryFormPage {
  private entry: JournalEntry;
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private journalService: JournalService, private formBuilder: FormBuilder, private scopeService: ScopeService, private dateService: DateService, private markdownService: MarkdownService) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});

    const id = this.navParams.get('id');
    const initial = this.navParams.get('initial');
    if (id) {
      this.journalService.getEntry$({id}).first().subscribe(entry => this.entry = entry)
    } else {
      this.entry = initial || {}
    }
    if (!this.entry.scope) {
      this.scopeService.scope$.first().subscribe(scope => this.entry.scope = scope)
    }
    if (!this.entry.start) {
      this.dateService.date$.first().subscribe(date => this.entry.start = date)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalEntryFormPage');
  }

  updateContent(content) {
    this.form.patchValue({content});
  }

  ngOnInit() {
    const entry = this.entry;
    this.form = this.formBuilder.group({
      id: [entry.id],
      ownerId: [entry.ownerId],
      scope: [entry.scope, Validators.required],
      start: [entry.start, Validators.required],
      content: [entry.content, Validators.required],
      keywords: [entry.keywords, Validators.required],
    });
  }

  save() {
    const entry = this.form.value;
    if (this.form.valid) {
      if (!entry.id) {
        this.journalService.addEntry(entry);
        this.navCtrl.pop();
      } else {
        this.journalService.updateEntry(entry.id, entry);
        this.navCtrl.pop();
      }
    }
  }

}
