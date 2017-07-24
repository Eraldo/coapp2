import {Injectable} from '@angular/core';

import {AlertController} from "ionic-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {SetDateAction} from "../../store/actions/date";
import {ScopeService} from "../scope/scope";
import {Observable} from "rxjs/Observable";
import moment from "moment";
import {Scope} from "../../models/scope";

@Injectable()
export class DateService {

  get date$() {
    return this.store.select(fromRoot.getDate);
  }

  constructor(private alertCtrl: AlertController, private store: Store<fromRoot.State>, private scopeService: ScopeService) {
    console.log('Hello DateService Provider');
  }

  setDate(date: string) {
    this.store.dispatch(new SetDateAction(date));
  }

  selectDate() {
    this.date$.take(1).subscribe(currentDate => {
        console.log('selecting date');
        let alert = this.alertCtrl.create();
        alert.setTitle('Date');

        alert.addInput({
          name: 'date',
          type: 'date',
          value: currentDate,
        });

        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            const date = data.date;
            if (date == currentDate) {
              // Date has not changed.
              return
            }
            this.setDate(date);
          }
        });
        alert.present();
      }
    );
  }

  next() {
    Observable.combineLatest(this.date$, this.scopeService.scope$, (date, scope) => {
      switch (scope) {
        case Scope.DAY: {
          return moment(date).add(1, 'day').format('YYYY-MM-DD')
        }
        case  Scope.WEEK: {
          return moment(date).add(1, 'week').format('YYYY-MM-DD')
        }
        case  Scope.MONTH: {
          return moment(date).add(1, 'month').format('YYYY-MM-DD')
        }
        case  Scope.YEAR: {
          return moment(date).add(1, 'year').format('YYYY-MM-DD')
        }
        default:
          return date;
      }
    }).first().subscribe(date => this.setDate(date))
  }

  previous() {
    Observable.combineLatest(this.date$, this.scopeService.scope$, (date, scope) => {
      switch (scope) {
        case Scope.DAY: {
          return moment(date).subtract(1, 'day').format('YYYY-MM-DD')
        }
        case  Scope.WEEK: {
          return moment(date).subtract(1, 'week').format('YYYY-MM-DD')
        }
        case  Scope.MONTH: {
          return moment(date).subtract(1, 'month').format('YYYY-MM-DD')
        }
        case  Scope.YEAR: {
          return moment(date).subtract(1, 'year').format('YYYY-MM-DD')
        }
        default:
          return date;
      }
    }).first().subscribe(date => this.setDate(date))
  }
}
