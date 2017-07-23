import {Injectable} from '@angular/core';

import {AlertController} from "ionic-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../store/reducers';
import {SetDateAction} from "../../store/actions/date";

@Injectable()
export class DateService {

  get date$() {
    return this.store.select(fromRoot.getDate);
  }

  constructor(private alertCtrl: AlertController, private store: Store<fromRoot.State>) {
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
          name: 'Date',
          type: 'date',
          value: currentDate,
          // label: date.toString(),
          // checked: date == currentDate
        });

        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            if (data == currentDate) {
              // Date has not changed.
              return
            }
            console.log(`Selected date: ${data}`);
            this.setDate(data);
          }
        });
        alert.present();
      }
    );
  }
}
