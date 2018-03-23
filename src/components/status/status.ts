import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClosedStatuses, Status, Statuses} from "../../models/status";
import {AlertController} from "ionic-angular";
import {Icon} from "../../models/icon";

@Component({
  selector: 'status',
  templateUrl: 'status.html'
})
export class StatusComponent {
  @Input() status: Status = Status.CURRENT;
  @Output() changed = new EventEmitter();
  color: string;
  icon: string;

  constructor(public alertCtrl: AlertController) {
    console.log('Hello StatusComponent Component');
  }

  ngOnChanges() {
    switch (this.status.toLowerCase()) {
      case Status.FUTURE:
        this.icon = Icon.STATUS_FUTURE;
        this.color = 'area-7';
        break;
      case Status.WAITING:
        this.icon = Icon.STATUS_WAITING;
        this.color = 'area-6';
        break;
      case Status.CURRENT:
        this.icon = Icon.STATUS_CURRENT;
        this.color = 'light';
        break;
      case Status.DONE:
        this.icon = Icon.STATUS_DONE;
        this.color = 'success';
        break;
      case Status.CANCELED:
        this.icon = Icon.STATUS_CANCELED;
        this.color = 'mid';
        break;
    }
  }

  select() {
    const isStatusClosed = ClosedStatuses.find(status => status == this.status);
    const statuses = isStatusClosed ? ClosedStatuses : Statuses;
    let alert = this.alertCtrl.create();
    alert.setTitle('Status');

    statuses.forEach((status) => {
      alert.addInput({
        type: 'radio',
        label: status.toString(),
        value: status.toString(),
        checked: status == this.status.toLowerCase()
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == this.status.toLowerCase()) {
          // Status has not changed.
          return
        }
        this.changed.emit(data);
      }
    });
    alert.present();
  }
}
