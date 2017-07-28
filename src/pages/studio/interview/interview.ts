import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ScopeService} from "../../../services/scope/scope";
import {InterviewEntry} from "../../../models/interview";
import {Observable} from "rxjs/Observable";
import {InterviewService} from "../../../services/interview/interview";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import moment from "moment";
import {DateService} from "../../../services/date/date";

@IonicPage()
@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html',
})
export class InterviewPage {
  entry$: Observable<InterviewEntry>;
  private form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private scopeService: ScopeService, private dateService: DateService, private interviewService: InterviewService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.entry$ = this.interviewService.entry$;
    // Observable.combineLatest(this.scopeService.scope$, this.dateService.date$, (scope, date) => {
    this.form = this.formBuilder.group({
      // id: [entry.id],
      // ownerId: [entry.ownerId, Validators.required],
      // scope: [scope],
      // start: [date],
      likes: ['', Validators.required],
      dislikes: ['', Validators.required],
    });
    // });
  }

  selectScope() {
    this.scopeService.selectScope()
  }

  save() {
    if (this.form.valid) {
      let entry = this.form.value;
      Observable.combineLatest(this.scopeService.scope$, this.dateService.date$).first()
        .subscribe(([scope, date]) => {
          entry.scope = scope;
          entry.start = date;
          this.interviewService.addEntry(entry);
          this.form.reset()
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterviewPage');
  }

}
