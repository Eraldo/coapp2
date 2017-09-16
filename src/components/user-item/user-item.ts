import {Component, Input} from '@angular/core';
import {User} from "../../models/user";
import {Observable} from "rxjs/Observable";
import {NavController} from "ionic-angular";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UserQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
    }
  }
`;


@Component({
  selector: 'user-item',
  templateUrl: 'user-item.html'
})
export class UserItemComponent {
  @Input() userId: string;
  user$: Observable<User>;

  constructor(private navCtrl: NavController, private apollo: Apollo) {
    console.log('Hello UserItemComponent Component');
  }

  ngOnChanges() {
    if (this.userId) {
      this.user$ = this.apollo.watchQuery<any>({
        query: UserQuery,
        variables: {id: this.userId}
      }).map(({data}) => data.user);
    }
  }

  showProfile() {
    this.navCtrl.push('LegendPage', {id: this.userId})
  }
}
