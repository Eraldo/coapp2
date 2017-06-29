import {Component, forwardRef, Input} from '@angular/core';
import {Outcome} from "../../models/outcome";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {OutcomeService} from "../../services/outcome/outcome";
import {ModalController} from "ionic-angular";

@Component({
  selector: 'outcome-input',
  templateUrl: 'outcome-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OutcomeInputComponent),
      multi: true
    }
  ]
})
export class OutcomeInputComponent implements ControlValueAccessor {
  @Input()
  outcome: Outcome;

  propagateChange = (_: any) => {
  };

  constructor(private outcomeService: OutcomeService, public modalCtrl: ModalController) {
    console.log('Hello OutcomeInputComponent Component');
  }

  writeValue(outcomeID: string): void {
    if (outcomeID) {
      this.outcomeService.getOutcome$(outcomeID).subscribe(outcome => this.outcome = outcome);
    }
    else {
      this.outcome = null;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  select() {
    console.log('Select outcome.');
    let outcomeSelectModal = this.modalCtrl.create('OutcomeSelectPage');
    outcomeSelectModal.onDidDismiss(outcome => {
      if (outcome) {
        this.outcome = outcome;
        this.propagateChange(outcome.id);
      }
    });
    outcomeSelectModal.present();

  }
}
