import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Scope} from "../../../models/scope";
import {Status, Statuses} from "../../../models/status";
import {Observable} from "rxjs/Observable";
import {OutcomeService} from "../../../services/outcome/outcome";
import {PartialOutcome} from "../../../models/outcome";
import moment from "moment";

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  private outcome: PartialOutcome = {status: Status.OPEN, scope: Scope.DAY, inbox: true};
  private form: FormGroup;
  scopes$: Observable<Scope[]>;
  statuses: Status[];
  now = moment().format();

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private outcomeService: OutcomeService) {
    this.scopes$ = this.outcomeService.createableScopes$;
    this.statuses = Statuses;
  }

  ngOnInit() {
    this.outcomeService.inboxOutcomes$.subscribe(outcomes => {
      this.outcome = outcomes[0];
      if (this.outcome) {
        this.form = this.formBuilder.group({
          id: [this.outcome.id],
          name: [this.outcome.name, [Validators.required, Validators.minLength(4)]],
          status: [this.outcome.status, Validators.required],
          scope: [this.outcome.scope, Validators.required],
          start: [this.outcome.start ? moment(this.outcome.start).format('YYYY-MM-DD') : null],
          deadline: [this.outcome.deadline ? moment(this.outcome.deadline).format('YYYY-MM-DD') : null],
          description: [this.outcome.description],
          // steps: [''],
        });
      } else {
        this.form = undefined;
      }
    });
  }

  newOutcome() {
    this.navCtrl.push("OutcomeFormPage", {initial: {inbox: true}})
  }

  delete() {
    this.outcomeService.deleteOutcome(this.outcome.id);
  }

  save() {
    const outcome = this.form.value;
    if (this.form.valid) {
      if (!outcome.id) {
        this.outcomeService.addOutcome(outcome);
      } else {
        outcome.inbox = false;
        this.outcomeService.updateOutcome(outcome.id, outcome);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

}
