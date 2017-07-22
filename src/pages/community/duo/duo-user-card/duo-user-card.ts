import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user/user";

@Component({
  selector: 'duo-user-card',
  templateUrl: 'duo-user-card.html'
})
export class DuoUserCardComponent {
  @Input() userId: string;
  user$: Observable<User>;

  constructor(private userService: UserService) {
    console.log('Hello DuoUserCardComponent Component');
  }

  ngOnChanges() {
    this.user$ = this.userService.getUserById$(this.userId)
  }
}
