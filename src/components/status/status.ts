import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClosedStatuses, Status, Statuses} from "../../models/status";
import {AlertController} from "ionic-angular";

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
        this.icon = 'cloud-circle';
        this.color = 'area-7';
        break;
      case Status.WAITING:
        this.icon = 'time';
        this.color = 'area-6';
        break;
      case Status.CURRENT:
        this.icon = 'checkmark-circle-outline';
        this.color = 'light';
        break;
      case Status.DONE:
        this.icon = 'checkmark-circle';
        this.color = 'success';
        break;
      case Status.CANCELED:
        this.icon = 'remove-circle';
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
        console.log(`Selected status: ${data}`);
        this.changed.emit(data);
      }
    });
    alert.present();
  }
}
