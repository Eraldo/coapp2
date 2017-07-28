import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Tribe, PartialTribe} from "../../models/tribe";
import {UserService} from "../user/user";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import * as community from '../../store/actions/community';
import {AddTribeAction} from "../../store/actions/community";
import {User} from "../../models/user";

@Injectable()
export class TribeService {

  get tribes$() {
    return this.store.select(fromRoot.getTribes)
  }

  get tribe$(): Observable<Tribe> {
    return this.store.select(fromRoot.getCurrentTribe)
  }

  get members$(): Observable<User[]> {
    return this.tribe$.switchMap(tribe => this.userService.getUsersByIds$(tribe.members))
      .catch(error => Observable.of([]));
  }

  get partner$(): Observable<User> {
    return Observable.combineLatest(this.userService.user$, this.members$, (user, members) => {
      return members.find(member => member.id != user.id)
    });
  }

  constructor(private userService: UserService, private store: Store<fromRoot.State>) {
    console.log('Hello TribeService Provider');
  }

  public addTribe(name: string, members?: string[]) {
    let tribe: PartialTribe = {name};
    if (members) {
      tribe.members = members;
    }
    this.store.dispatch(new AddTribeAction(tribe));
  }

  public joinTribe(tribeId: string) {
    this.store.dispatch(new community.JoinTribeAction(tribeId));
  }

  public quitTribe() {
    this.store.dispatch(new community.QuitTribeAction());
  }

}
