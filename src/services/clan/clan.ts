import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Clan, PartialClan} from "../../models/clan";
import {UserService} from "../user/user";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import * as community from '../../store/actions/community';
import {AddClanAction} from "../../store/actions/community";
import {User} from "../../models/user";

@Injectable()
export class ClanService {

  get clans$() {
    return this.store.select(fromRoot.getClans)
  }

  get clan$(): Observable<Clan> {
    return this.store.select(fromRoot.getCurrentClan)
  }

  get members$(): Observable<User[]> {
    return this.clan$.switchMap(clan => this.userService.getUsersByIds$(clan.members))
      .catch(error => Observable.of([]));
  }

  get partner$(): Observable<User> {
    return Observable.combineLatest(this.userService.user$, this.members$, (user, members) => {
      return members.find(member => member.id != user.id)
    });
  }

  constructor(private userService: UserService, private store: Store<fromRoot.State>) {
    console.log('Hello ClanService Provider');
  }

  public addClan(name: string, members?: string[]) {
    let clan: PartialClan = {name};
    if (members) {
      clan.members = members;
    }
    this.store.dispatch(new AddClanAction(clan));
  }

  public joinClan(clanId: string) {
    this.store.dispatch(new community.JoinClanAction(clanId));
  }

  public quitClan() {
    this.store.dispatch(new community.QuitClanAction());
  }

}
