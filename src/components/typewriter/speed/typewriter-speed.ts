import {Component, Input,} from '@angular/core';

@Component({
  selector: 'tw-speed',
  template: ``
})
export class TypewriterSpeedComponent {
  @Input() ms = 0;

  constructor() {
    console.log('Hello TypewriterPauseComponent Component');
  }
}
