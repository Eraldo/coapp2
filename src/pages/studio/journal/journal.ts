import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from "moment";
import {ScopeService} from "../../../services/scope/scope";

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage implements OnInit {
  date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService) {
  }

  ngOnInit(): void {
    this.date = moment().toISOString();
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalPage');
  }

}
