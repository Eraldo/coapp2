import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icon} from "../../models/icon";

@Component({
  selector: 'tag',
  templateUrl: 'tag.html'
})
export class TagComponent {
  @Input() name: string;
  @Input() closable = false;
  @Output() closed = new EventEmitter();
  icons;

  constructor() {
    console.log('Hello TagComponent Component');
    this.icons = Icon;
  }

  close(event) {
    event.stopPropagation();
    this.closed.next();
  }
}
