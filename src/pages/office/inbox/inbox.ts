import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Scope, Scopes} from "../../../models/scope";
import {Status, Statuses} from "../../../models/status";

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  private outcome: FormGroup;
  scopes: Scope[];
  statuses: Status[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.scopes = Scopes;
    this.statuses = Statuses;
    this.outcome = this.formBuilder.group({
      name: ['mobile app', [Validators.required, Validators.minLength(3)]],
      status: [Status.OPEN, Validators.required],
      scope: [Scope.DAY, Validators.required],
      deadline: [''],
      start: [''],
      content: ['I want a modern app for colgend!'],
      steps: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

}
