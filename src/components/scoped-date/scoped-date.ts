import {Component, Input} from '@angular/core';
import {getScopeEnd, getScopeStart, Scope} from "../../models/scope";
import * as moment from "moment";

@Component({
  selector: 'scoped-date',
  templateUrl: 'scoped-date.html'
})
export class ScopedDateComponent {
  @Input() scope = Scope.DAY;
  @Input() date = moment().format('YYYY-MM-DD');
  @Input() icon = 'calendar';
  @Input() showWeekday = true;

  constructor() {
    console.log('Hello ScopedDateComponent Component');
  }

  get start() {
    return getScopeStart(this.scope, this.date);
  }

  get end() {
    return getScopeEnd(this.scope, this.date)
  }

  get today() {
    return moment().format('YYYY-MM-DD');
  }

  get startDateFormat() {
    // only show the year if it is neither the current year nor the same as the end date.
    return `MMM D${this.today.slice(0, 4) == this.start.slice(0, 4) || this.start.slice(0, 4) == this.end.slice(0, 4) ? '' : ', YYYY'}`;
  }

  get endDateFormat() {
    // only show the month if it is different from the starting month and only show the year if it is not the current year.
    return `${this.start.slice(0, 7) == this.end.slice(0, 7) ? '' : 'MMM '}D${this.today.slice(0, 4) == this.end.slice(0, 4) ? '' : ', YYYY'}`;
  }

  get color() {
    return `area-${moment(this.start).isoWeekday()}`
  }
}
