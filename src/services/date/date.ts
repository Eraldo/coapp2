import {Injectable} from '@angular/core';

import {AlertController, Platform} from "ionic-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {SetDateAction} from "../../store/actions/date";
import {ScopeService} from "../scope/scope";
import {Observable} from "rxjs/Observable";
import moment from "moment";
import {Scope} from "../../models/scope";
import {DatePicker} from "@ionic-native/date-picker";

@Injectable()
export class DateService {

  get date$() {
    return this.store.select(fromRoot.getDate);
  }

  constructor(public alertCtrl: AlertController, public store: Store<fromRoot.State>, public scopeService: ScopeService, public platform: Platform, public datePicker: DatePicker) {
    console.log('Hello DateService Provider');
  }

  setDate(date: string) {
    this.store.dispatch(new SetDateAction(date));
  }

  selectDate() {
    this.date$.take(1).subscribe(currentDate => {
        console.log('selecting date');
        if (this.platform.is('cordova')) {
          this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
            titleText: 'Date',
            todayText: 'today'

          }).then(
            date => {
              const newDate = moment(date).format('YYYY-MM-DD');
              this.setDate(newDate);
            },
            err => console.log('Error occurred while getting date: ', err)
          );
        } else {
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
