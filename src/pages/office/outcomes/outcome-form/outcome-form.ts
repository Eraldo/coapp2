import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PartialOutcome} from "../../../../models/outcome";
import {Status, Statuses} from "../../../../models/status";
import {Scope, Scopes} from "../../../../models/scope";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OutcomeService} from "../../../../services/outcome/outcome";
import moment from "moment";
import {ScopeService} from "../../../../services/scope/scope";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-outcome-form',
  templateUrl: 'outcome-form.html',
})
export class OutcomeFormPage {
  private outcome: PartialOutcome = {status: Status.OPEN, inbox: true};
  // private steps;
  // private removeSteps: String[] = [];
  private form: FormGroup;
  scopes$: Observable<Scope[]>;
  statuses: Status[];
  create: boolean = false;
  now = moment().format();

  constructor(public navCtrl: NavController, public navParams: NavParams, private outcomeService: OutcomeService, private formBuilder: FormBuilder, private scopeService: ScopeService) {
    this.scopes$ = this.outcomeService.createableScopes$;
    const id = this.navParams.get('id');
    if (id) {
      this.outcomeService.getOutcome$({id}).first().subscribe(outcome => this.outcome = outcome)
    }
    if (!this.outcome.scope) {
      this.scopeService.scope$.first().subscribe(scope => this.outcome.scope = scope)
    }
    // this.steps = Steps.find(
    //   {outcomeId: this.outcome._id}
    // );
    this.statuses = Statuses;
    // Checking for an existing outcome.
    if (!this.outcome.id) {
      this.create = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomeFormPage');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.outcome.id],
      name: [this.outcome.name, [Validators.required, Validators.minLength(4)]],
      status: [this.outcome.status, Validators.required],
      inbox: [this.outcome.inbox],
      scope: [this.outcome.scope, Validators.required],
      start: [this.outcome.start ? moment(this.outcome.start).format('YYYY-MM-DDTHH:mm') : null],
      deadline: [this.outcome.deadline ? moment(this.outcome.deadline).format('YYYY-MM-DDTHH:mm') : null],
      description: [this.outcome.description],
      // steps: this.formBuilder.array([
      // ]),
    });
    // const control = <FormArray>this.form.controls['steps'];
    // this.steps.forEach((step) => {
    //   // console.log(step);
    //   control.push(this.initStep(step));
    // });
  }

  // initStep(step?: Step) {
  //   return this.formBuilder.group({
  //     id: [step ? step.id : null],
  //     outcome: [step ? step.outcome : this.outcome.id],
  //     name: [step ? step.name : null, [Validators.required, Validators.minLength(4)]],
  //     done: [step ? step.done : false],
  //   })
  // }

  // addStep(step?: Step) {
  //   const control = <FormArray>this.form.controls['steps'];
  //   control.push(this.initStep(step));
  //   // Not sure if this is correct! (I am wondering why it was not 'dirty' after removing an item.)
  //   control.markAsDirty();
  // }

  // removeStep(i: number) {
  //   const control = <FormArray>this.form.controls['steps'];
  //   let stepId = control.at(i).value._id;
  //   if (stepId) {
  //     this.removeSteps.push(stepId);
  //   }
  //   control.removeAt(i);
  //   // Not sure if this is correct! (I am wondering why it was not 'dirty' after removing an item.)
  //   control.markAsDirty();
  // }

  save() {
    const outcome = this.form.value;

    if (this.form.valid) {
      if (this.create) {
        this.outcomeService.addOutcome(outcome);
        this.navCtrl.pop();
      } else {
        this.outcomeService.updateOutcome(outcome.id, outcome);
        this.navCtrl.pop();
      }
    }
  }

}
