import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ModalController} from "ionic-angular";
import {Status} from "../../models/status";

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
  id: string;
  @Input()
  excludedIds = [];

  propagateChange = (_: any) => {
  };

  constructor(private modalCtrl: ModalController) {
    console.log('Hello OutcomeInputComponent Component');
  }

  writeValue(id: string): void {
    if (id) {
      this.id = id;
    }
    else {
      this.id = null;
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
    const status = Status.CURRENT;
    const excludedIds = this.excludedIds;
    let outcomeSelectModal = this.modalCtrl.create('OutcomeSelectPage', {excludedIds, status});
    outcomeSelectModal.onDidDismiss(id => {
      if (id) {
        this.id = id;
        this.propagateChange(id);
        this.excludedIds.push(id);
      }
    });
    outcomeSelectModal.present();

  }
}
