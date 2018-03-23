import {Component, Input} from '@angular/core';
import {Icon} from "../../models/icon";

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
  icons;

  constructor() {
    this.icons = Icon;
    console.log('Hello LifeAreaMetersComponent Component');
  }

}
