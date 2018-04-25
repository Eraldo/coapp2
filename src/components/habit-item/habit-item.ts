import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icon} from "../../models/icon";
import {TrackHabitMutation} from "../../pages/habit/habit";
import {Apollo} from "apollo-angular";


@Component({
  selector: 'habit-item',
  templateUrl: 'habit-item.html'
})
export class HabitItemComponent {
  icons = Icon;
  @Input() habit;
  @Input() showTracker = false;
  @Output() tracked = new EventEmitter();

  constructor(private apollo: Apollo) {
    console.log('Hello HabitItemComponent Component');
  }

  track(index) {
    // alert(`Tracked ${index}`);
    this.tracked.next(index);
  }
}
