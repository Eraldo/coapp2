import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'date-input',
  templateUrl: 'date-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input()
  date: string;

  propagateChange = (_: any) => {
  };

  constructor(private alertCtrl: AlertController) {
    console.log('Hello DateInputComponent Component');
  }

  writeValue(date: string): void {
    this.date = date;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  select() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Date');

    alert.addInput({
      name: 'date',
      type: 'date',
      value: this.date,
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        const date = data.date;
        if (date == this.date) {
          // Date has not changed.
          return
        }
        this.date = date;
        this.propagateChange(date);
      }
    });
    alert.present();
  }
}
