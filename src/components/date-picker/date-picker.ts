import { Component } from '@angular/core';
import {DateService} from "../../services/date/date";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})
export class DatePickerComponent {
  date$: Observable<string>;

  constructor(private dateService: DateService) {
    console.log('Hello DatePickerComponent Component');
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
  }

  selectDate() {
    this.dateService.selectDate();
  }

}
