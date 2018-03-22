import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tag',
  templateUrl: 'tag.html'
})
export class TagComponent {
  @Input() name: string;
  @Input() closable = false;
  @Output() closed = new EventEmitter();

  constructor() {
    console.log('Hello TagComponent Component');
  }

  close() {
    this.closed.next()
  }
}
