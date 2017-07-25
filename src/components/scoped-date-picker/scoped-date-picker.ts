import { Component } from '@angular/core';
import {DateService} from "../../services/date/date";

@Component({
  selector: 'scoped-date-picker',
  templateUrl: 'scoped-date-picker.html'
})
export class ScopedDatePickerComponent {

  constructor(private dateService: DateService) {
    console.log('Hello ScopedDatePickerComponent Component');
  }

  next() {
    this.dateService.next()
  }

  previous() {
    this.dateService.previous()
  }
}
