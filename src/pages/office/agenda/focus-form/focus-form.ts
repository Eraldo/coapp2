import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FocusService} from "../../../../services/focus/focus";
import {PartialFocus} from "../../../../models/focus";
import {Outcome} from "../../../../models/outcome";
import {FormBuilder, FormGroup} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-focus-form',
  templateUrl: 'focus-form.html',
})
export class FocusFormPage {
  focus: PartialFocus;
  outcomes: Outcome[];
  private form: FormGroup;
  ordering = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private focusService: FocusService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const scope = this.navParams.get('scope');
    const start = this.navParams.get('start');
    if (scope && start) {
      this.focusService.getFocus$(scope, start).subscribe(focus => {
        this.focus = focus || {scope, start};
        this.form = this.formBuilder.group({
          outcome1: [focus ? this.focus.outcome1 : undefined],
          outcome2: [focus ? this.focus.outcome2 : undefined],
          outcome3: [focus ? this.focus.outcome3 : undefined],
          outcome4: [focus ? this.focus.outcome4 : undefined],
        }, {
          validator: this.validateHasFocus
        });
      })
    } else {
      // Not enough data!
      this.navCtrl.pop()
    }
  }

  validateHasFocus(group: FormGroup) {
    var outcome1 = group.controls['outcome1'];
    var outcome2 = group.controls['outcome2'];
    var outcome3 = group.controls['outcome3'];
    var outcome4 = group.controls['outcome4'];

    // Checking if there is an outcome.
    if (!(outcome1.value || outcome2.value || outcome3.value || outcome4.value)) {
      // group.setErrors({outcome1: 'Focus required'}, {emitEvent: true});
      return {noOutcome: true};
      // return null;
    }

    // TODO: Checking to make sure no outcome is set multiple times.
    // TODO: Checking to make sure that all outcomes have the same scope as the focus.
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FocusFormPage');
  }

  save() {
    if (this.form.valid) {
      if (this.focus.id) {
        // Updating Focus.
        this.focusService.updateFocus$(this.focus.id, this.form.value)
          .subscribe(focus => this.navCtrl.pop(), console.error)
      } else {
        // Creating and then updating Focus.
        this.focusService.createFocus$(this.focus.scope, this.focus.start.toString())
          .switchMap(focus => this.focusService.updateFocus$(focus.id, this.form.value))
          .subscribe(focus => this.navCtrl.pop(), console.error)
      }
    }
  }

  toggleOrdering() {
    this.ordering = !this.ordering;
  }

  reorder(indexes) {
    // Change values of indexes.from and indexes.to
    console.log('>> indexes', indexes);
    const fromField = `outcome${indexes.from+1}`;
    const toField = `outcome${indexes.to+1}`;
    const fromValue = this.form.value[fromField];
    const toValue = this.form.value[toField];
    let changes = {};
    changes[fromField] = toValue;
    changes[toField] = fromValue;
    console.log(changes);
    this.form.patchValue(changes, {emitEvent: true});
  }

  reset(index) {
    const field = `outcome${index+1}`;
    let changes = {};
    changes[field] = null;
    this.form.patchValue(changes, {emitEvent: true});
  }
}
