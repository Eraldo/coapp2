import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'habit-item',
  templateUrl: 'habit-item.html'
})
export class HabitItemComponent {
  @Input() habit;
  @Input() showTracker = false;
  @Output() tracked = new EventEmitter();

  constructor() {
    console.log('Hello HabitItemComponent Component');
  }

  track(event) {
    alert('track');
    this.tracked.next(this.habit.id);
    event.preventDefault();
  }
}
