import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";
import {ScopeService} from "../../../services/scope/scope";
import {Observable} from "rxjs/Observable";
import {JournalEntry} from "../../../models/journal";
import {JournalService} from "../../../services/journal/journal";
import {FormBuilder, FormGroup} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit {
  entry$: Observable<JournalEntry>;
  private form: FormGroup;
  text = "Foo BarBlub.";

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private journalService: JournalService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      content: ['Foo BarBlub.'],
    });
  }

  ngOnInit(): void {
    this.entry$ = this.journalService.entry$;

  }

  edit() {
    this.entry$.first().subscribe(entry => {
      console.log('>>', entry);
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
