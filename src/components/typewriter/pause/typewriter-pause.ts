import {Component, Input,} from '@angular/core';

@Component({
  selector: 'tw-pause',
  template: ``
})
export class TypewriterPauseComponent {
  @Input() ms = 0;

  constructor() {
    console.log('Hello TypewriterPauseComponent Component');
  }
}
