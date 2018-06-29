import {Component, Input} from '@angular/core';

@Component({
  selector: 'role-item',
  templateUrl: 'role-item.html'
})
export class RoleItemComponent {
  @Input() role;

  constructor() {
    console.log('Hello RoleItemComponent Component');
  }
}
