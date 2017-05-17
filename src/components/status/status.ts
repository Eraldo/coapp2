import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Status, STATUSES} from "../../models/status";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'status',
  templateUrl: 'status.html'
})
export class StatusComponent {
  @Input() status: Status = Status.OPEN;
  @Output() changed = new EventEmitter();
  color: string;
  icon: string;

  constructor(public alertCtrl: AlertController) {
    console.log('Hello StatusComponent Component');
  }

  ngOnChanges() {
    console.log(this.status);
    switch (this.status) {
      case Status.OPEN:
        this.icon = 'checkmark-circle-outline';
        this.color = 'light';
        break;
      case Status.WAITING:
        this.icon = 'time';
        this.color = 'area-7';
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
    let alert = this.alertCtrl.create();
    alert.setTitle('Status');

    STATUSES.forEach((status) => {
      alert.addInput({
        type: 'radio',
        label: status.toString(),
        value: status.toString(),
        checked: status == this.status
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == this.status) {
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
