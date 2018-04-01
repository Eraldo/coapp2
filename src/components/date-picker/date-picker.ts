import { Component } from '@angular/core';
import {DateService} from "../../services/date/date";
import {Observable} from "rxjs/Observable";
import moment from "moment";

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})
export class DatePickerComponent {
  date$: Observable<string>;
  currentDate: string;
  color$: Observable<string>;

  constructor(private dateService: DateService) {
    console.log('Hello DatePickerComponent Component');
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;
    this.currentDate = moment().format('YYYY-MM-DD');
    this.color$ = this.date$.map(date => {
      return `area-${moment(date).isoWeekday()}`
    })
  }

  selectDate() {
    this.dateService.selectDate(this.currentDate);
  }

}
