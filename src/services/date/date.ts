import {Injectable} from '@angular/core';

import {AlertController, Platform} from "ionic-angular";
import {ScopeService} from "../scope/scope";
import moment from "moment";
import {getScopeStart, Scope} from "../../models/scope";
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

  constructor(public alertCtrl: AlertController, public scopeService: ScopeService, public platform: Platform, public datePicker: DatePicker) {
    console.log('Hello DateService Provider');
  }

  setDate(date: string) {
    this._date$.next(date);
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
