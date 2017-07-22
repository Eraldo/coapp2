import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Duo, PartialDuo} from "../../models/duo";
import {UserService} from "../user/user";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import * as community from '../../store/actions/community';
import {AddDuoAction} from "../../store/actions/community";
import {User} from "../../models/user";

@Injectable()
export class DuoService {

  get duos$() {
    return this.store.select(fromRoot.getDuos)
  }

  get duo$(): Observable<Duo> {
    return this.store.select(fromRoot.getCurrentDuo)
  }

  get members$(): Observable<User[]> {
    return this.duo$.switchMap(duo => this.userService.getUsersByIds$(duo.members))
      .catch(error => Observable.of([]));
  }

  get partner$(): Observable<User> {
    return Observable.combineLatest(this.userService.user$, this.members$, (user, members) => {
      return members.find(member => member.id != user.id)
    });
  }

  constructor(private userService: UserService, private store: Store<fromRoot.State>) {
    console.log('Hello DuoService Provider');
  }

  public addDuo(name: string, members?: string[]) {
    let duo: PartialDuo = {name};
    if (members) {
      duo.members = members;
    }
    this.store.dispatch(new AddDuoAction(duo));
  }

  public joinDuo(duoId: string) {
    this.store.dispatch(new community.JoinDuoAction(duoId));
  }

  public quitDuo() {
    this.store.dispatch(new community.QuitDuoAction());
  }

}
