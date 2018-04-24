import {Component, Input} from '@angular/core';

@Component({
  selector: 'routine-item',
  templateUrl: 'routine-item.html'
})
export class RoutineItemComponent {
  @Input() routine;

  constructor() {
    console.log('Hello RoutineItemComponent Component');
  }
}
