import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Duo, PartialDuo} from "../../models/duo";
import {UserService} from "../user/user";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import * as community from '../../store/actions/community';
import {AddDuoAction} from "../../store/actions/community";

@Injectable()
export class DuoService {

  get duos$() {
    return this.store.select(fromRoot.getDuos)
  }

  get duo$(): Observable<Duo> {
    return this.store.select(fromRoot.getCurrentDuo);
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

  public loadOwnDuo() {
    this.userService.user$.take(1).subscribe(user => {
      if (user.duo) {
        this.store.dispatch(new community.LoadDuoAction(user.duo));
      }
    })
  }

  public loadDuos() {
    this.store.dispatch(new community.LoadDuosAction());
  }

  public joinDuo(duoId: string) {
    this.store.dispatch(new community.JoinDuoAction(duoId));
    // return Observable.combineLatest(this.userService.user$, this.getDuo$(duoId))
    //   .switchMap(([user, duo]) => {
    //     let members = duo.members;
    //     members.push(user.id);
    //     return this.updateDuo$(duo.id, {members});
    //   })
  }

  public quitDuo() {
    this.store.dispatch(new community.QuitDuoAction());
    // return Observable.combineLatest(this.userService.user$, this.duo$)
    //   .switchMap(([user, duo]) => {
    //     const members = duo.members.filter(id => id != user.id);
    //     return this.updateDuo$(user.duo, {members})
    //   })
  }

}
