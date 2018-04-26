import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icon} from "../../models/icon";
import {Apollo} from "apollo-angular";
import {UpdateHabitMutation} from "../../pages/home/habits/habit/habit";
import {AlertController, PopoverController} from 'ionic-angular';


@Component({
  selector: 'habit-item',
  templateUrl: 'habit-item.html'
})
export class HabitItemComponent {
  icons = Icon;
  @Input() habit;
  @Input() active = false;
  @Input() showTracker = false;
  @Output() tracked = new EventEmitter();

  constructor(private apollo: Apollo, private alertCtrl: AlertController, public popoverCtrl: PopoverController) {
    console.log('Hello HabitItemComponent Component');
  }

  updateName(event) {
    if (!this.active) return;
    event.stopPropagation();

    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.habit.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            const id = this.habit.id;
            const name = data.name;
            this.apollo.mutate({
              mutation: UpdateHabitMutation,
              variables: {id, name}
            }).subscribe();
          }
        }
      ]
    });
    prompt.present();
  }

  updateIcon(event) {
    if (!this.active) return;
    event.stopPropagation();

    let popover = this.popoverCtrl.create('EmojiPopoverPage', {}, {cssClass: 'emoji-popover'});
    popover.onDidDismiss(data => {
      if (data) {
        this.apollo.mutate({
          mutation: UpdateHabitMutation,
          variables: {id: this.habit.id, icon: data}
        }).subscribe();
      }
    });
    popover.present({
      ev: event
    });
  }

  track(index) {
    this.tracked.next(index);
  }
}
