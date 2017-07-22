import {Component, Input} from '@angular/core';
import {User} from "../../models/user";
import {Observable} from "rxjs/Observable";
import {UserService} from "../../services/user/user";
import {NavController} from "ionic-angular";

@Component({
  selector: 'user-item',
  templateUrl: 'user-item.html'
})
export class UserItemComponent {
  @Input() userId: string;
  user$: Observable<User>;

  constructor(private navCtrl: NavController, private userService: UserService) {
    console.log('Hello UserItemComponent Component');
  }

  ngOnChanges() {
    this.user$ = this.userService.getUserById$(this.userId)
  }

  showProfile() {
    this.navCtrl.push('LegendPage', {id: this.userId})
  }
}
