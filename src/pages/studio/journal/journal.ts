import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from "moment";
import {ScopeService} from "../../../services/scope/scope";
import {Observable} from "rxjs/Observable";
import {JournalEntry} from "../../../models/journal";
import {JournalService} from "../../../services/journal/journal";

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit {
  entry$: Observable<JournalEntry>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private journalService: JournalService) {
  }

  ngOnInit(): void {
    this.entry$ = this.journalService.entry$
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

}
