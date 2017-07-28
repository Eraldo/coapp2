import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";
import {InterviewEntry} from "../../../models/interview";
import {Observable} from "rxjs/Observable";
import {InterviewService} from "../../../services/interview/interview";

@IonicPage()
@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html',
})
export class InterviewPage {
  entry$: Observable<InterviewEntry>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private interviewService: InterviewService) {
  }

  ngOnInit(): void {
    this.entry$ = this.interviewService.entry$;
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterviewPage');
  }

}
