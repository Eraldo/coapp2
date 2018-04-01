import {Injectable} from '@angular/core';

import {AlertController, Platform} from "ionic-angular";
import {ScopeService} from "../scope/scope";
import moment from "moment";
import {getScopeEnd, getScopeStart, Scope} from "../../models/scope";
import {DatePicker} from "@ionic-native/date-picker";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DateService {
  _date$ = new BehaviorSubject<string>(moment().format('YYYY-MM-DD'));

  get date$() {
    return this._date$.asObservable();
  }

  get scopedDate$() {
    return Observable.combineLatest(this.scopeService.scope$, this.date$, (scope, date) => {
      return getScopeStart(scope, moment(date).format('YYYY-MM-DD'));
    })
  }

  get scopedEndDate$() {
    return Observable.combineLatest(this.scopeService.scope$, this.date$, (scope, date) => {
      return getScopeEnd(scope, moment(date).format('YYYY-MM-DD'));
    })
  }

  constructor(public alertCtrl: AlertController, public scopeService: ScopeService, public platform: Platform, public datePicker: DatePicker) {
    console.log('Hello DateService Provider');
  }

  setDate(date: string) {
    this._date$.next(date);
  }

  selectDate(currentDate: string): Promise<string> {
    return new Promise((resolve, reject) => {
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
            resolve(newDate);
          },
          error => reject(`Error occurred while getting date: ${error}`)
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
              reject('Date has not changed.');
              return
            }
            resolve(date);
          }
        });
        alert.present();
      }
    });
  }

  next(scope: Scope, date: string): Promise<string> {
    return new Promise((resolve, reject) => {

      switch (scope) {
        case Scope.DAY: {
          resolve(moment(date).add(1, 'day').format('YYYY-MM-DD'));
        }
        case  Scope.WEEK: {
          resolve(moment(date).add(1, 'week').format('YYYY-MM-DD'));
        }
        case  Scope.MONTH: {
          resolve(moment(date).add(1, 'month').format('YYYY-MM-DD'));
        }
        case  Scope.YEAR: {
          resolve(moment(date).add(1, 'year').format('YYYY-MM-DD'));
        }
        default:
          reject(`No next date found for "${scope}" "${date}"`);
      }
    });
  }

  previous(scope: Scope, date: string): Promise<string> {
    return new Promise((resolve, reject) => {
      switch (scope) {
        case Scope.DAY: {
          resolve(moment(date).subtract(1, 'day').format('YYYY-MM-DD'));
        }
        case  Scope.WEEK: {
          resolve(moment(date).subtract(1, 'week').format('YYYY-MM-DD'));
        }
        case  Scope.MONTH: {
          resolve(moment(date).subtract(1, 'month').format('YYYY-MM-DD'));
        }
        case  Scope.YEAR: {
          resolve(moment(date).subtract(1, 'year').format('YYYY-MM-DD'));
        }
        default:
          reject(`No previous date found for "${scope}" "${date}"`);
      }
    });
  }
}
