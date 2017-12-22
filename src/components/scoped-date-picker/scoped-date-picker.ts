import { Component } from '@angular/core';
import {DateService} from "../../services/date/date";
import {ScopeService} from "../../services/scope/scope";

@Component({
  selector: 'scoped-date-picker',
  templateUrl: 'scoped-date-picker.html'
})
export class ScopedDatePickerComponent {

  constructor(private dateService: DateService, private scopeService: ScopeService) {
    console.log('Hello ScopedDatePickerComponent Component');
  }

  next() {
    this.dateService.next()
  }

  previous() {
    this.dateService.previous()
  }

  selectDate() {
    this.dateService.selectDate();
  }
}
