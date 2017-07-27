import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";
import {Observable} from "rxjs/Observable";
import {JournalEntry} from "../../../models/journal";
import {JournalService} from "../../../services/journal/journal";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MarkdownService} from "angular2-markdown";
import {DateService} from "../../../services/date/date";

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit {
  entry$: Observable<JournalEntry>;
  private form: FormGroup;
  text = "Foo BarBlub.";

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private journalService: JournalService, private formBuilder: FormBuilder, private markdownService: MarkdownService, private dateService: DateService) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit(): void {
    this.entry$ = this.journalService.entry$;
    this.form = this.formBuilder.group({
      content: ['Foo BarBlub.'],
    });
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
