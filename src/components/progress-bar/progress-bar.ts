import {Component, Input} from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  @Input()
  value: number;
  @Input()
  max = 100;
  @Input()
  color = 'background';

  get width() {
    return (this.value / this.max) * 100;
  }

  constructor() {
    console.log('Hello ProgressBarComponent Component');
  }

}
