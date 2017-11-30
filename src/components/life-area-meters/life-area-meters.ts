import {Component, Input} from '@angular/core';

@Component({
  selector: 'life-area-meters',
  templateUrl: 'life-area-meters.html'
})
export class LifeAreaMetersComponent {

  @Input() area1 = 0;
  @Input() area2 = 0;
  @Input() area3 = 0;
  @Input() area4 = 0;
  @Input() area5 = 0;
  @Input() area6 = 0;
  @Input() area7 = 0;

  constructor() {
    console.log('Hello LifeAreaMetersComponent Component');
    this.area1 = 10;
    this.area2 = 30;
    this.area3 = 60;
    this.area4 = 50;
    this.area5 = 0;
    this.area6 = 70;
    this.area7 = 100;
  }

}
