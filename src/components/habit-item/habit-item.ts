import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icon} from "../../models/icon";

@Component({
  selector: 'habit-item',
  templateUrl: 'habit-item.html'
})
export class HabitItemComponent {
  icons = Icon;
  @Input() habit;
  @Input() showTracker = false;
  @Output() tracked = new EventEmitter();

  constructor() {
    console.log('Hello HabitItemComponent Component');
  }

  track() {
    this.tracked.next(this.habit.id);
  }
}
