import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icon} from "../../models/icon";
import {Apollo} from "apollo-angular";
import {TrackHabitMutation, UpdateHabitMutation} from "../../pages/home/habits/habit/habit";
import {AlertController, LoadingController, PopoverController} from 'ionic-angular';
import {AudioService, Sound} from "../../services/audio/audio";


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

  constructor(
    private apollo: Apollo,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public audioService: AudioService,
  ) {
    console.log('Hello HabitItemComponent Component');
  }

  updateName(event) {
    if (this.habit.isControlled) {
      return
    }
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
    if (this.habit.isControlled) {
      return
    }
    if (!this.active) return;
    event.stopPropagation();

    let loading = this.loadingCtrl.create({
      content: "Opening icon picker...",
    });
    loading.present();

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
    }).then(() => loading.dismiss());
  }

  track(index) {
    if (!this.habit.isControlled && !this.habit.isTracked && index == 0) {
      const id = this.habit.id;
      this.apollo.mutate({
        mutation: TrackHabitMutation,
        variables: {id},
      }).subscribe(() => {
        this.audioService.play(Sound.DONE);
        this.tracked.next();
      });
    }
  }
}
