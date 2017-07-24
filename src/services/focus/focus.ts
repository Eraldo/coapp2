import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Scope} from "../../models/scope";
import {Focus, PartialFocus} from "../../models/focus";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {AddFocusAction, UpdateFocusAction} from "../../store/actions/office";

@Injectable()
export class FocusService {

  get focuses$() {
    return this.store.select(fromRoot.getFocuses);
  }

  get focus$() {
    return this.store.select(fromRoot.getCurrentFocus);
  }

  constructor(public http: Http, private store: Store<fromRoot.State>) {
    console.log('Hello FocusService Provider');
  }

  public getFocuses$(scope: Scope, start: string): Observable<Focus[]> {
    return this.focuses$.map(focuses =>
      focuses.filter(focus => focus.scope == scope && focus.start == start))
  }

  public getFocus$(scope: Scope, start: string): Observable<Focus> {
    return this.focuses$.map(focuses =>
      focuses.find(focus => focus.scope == scope && focus.start == start))
  }

  public addFocus(focus: PartialFocus) {
    this.store.dispatch(new AddFocusAction(focus));
  }

  public updateFocus(id: string, changes: PartialFocus) {
    this.store.dispatch(new UpdateFocusAction({id, changes}));
  }

  public setFocus(scope: Scope, start: string, id: string) {
    // return this.focus$
    //   .switchMap(focus => {
    //     if (!focus) {
    //       return this.createFocus$(scope, start);
    //     } else {
    //       return Observable.of(focus);
    //     }
    //   })
    //   .switchMap(focus => {
    //     if (!focus) {
    //       return Observable.throw('Focus does not exist.')
    //     }
    //     let changes = {};
    //     if (!focus.outcome1) {
    //       changes['outcome1'] = id
    //     } else if (!focus.outcome2) {
    //       changes['outcome2'] = id
    //     } else if (!focus.outcome3) {
    //       changes['outcome3'] = id
    //     } else if (!focus.outcome4) {
    //       changes['outcome4'] = id
    //     } else {
    //       return Observable.throw('Maximum of 4 outcomes reached.')
    //     }
    //     return this.updateFocus$(focus.id, changes)
    //   })
  }

  public unsetFocus(scope: Scope, start: string, id: string) {
    // return this.getFocus$(scope, start)
    //   .switchMap(focus => {
    //     if (!focus) {
    //       return this.createFocus$(scope, start);
    //     } else {
    //       return Observable.of(focus);
    //     }
    //   })
    //   .switchMap(focus => {
    //     if (!focus) {
    //       return Observable.throw('Focus does not exist.')
    //     }
    //     console.log('unsetting', focus);
    //     let changes = {};
    //     if (focus.outcome1 && focus.outcome1 == id) {
    //       changes['outcome1'] = null;
    //     } else if (focus.outcome2 && focus.outcome2 == id) {
    //       changes['outcome2'] = null;
    //     } else if (focus.outcome3 && focus.outcome3 == id) {
    //       changes['outcome3'] = null;
    //     } else if (focus.outcome4 && focus.outcome4 == id) {
    //       changes['outcome4'] = null;
    //     } else {
    //       return Observable.throw('Cannot unset focus: Outcome not found.')
    //     }
    //     return this.updateFocus$(focus.id, changes)
    //   })
  }
}
