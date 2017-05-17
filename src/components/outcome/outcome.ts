import {Component, Input} from '@angular/core';
import {Outcome} from "../../models/outcome";
import {Status, STATUSES} from "../../models/status";
import {AlertController, NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'outcome-item',
  templateUrl: 'outcome.html'
})
export class OutcomeComponent {
  @Input() outcome: Outcome;
  @Input() details = true;
  statuses = STATUSES;
  doneSteps = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    console.log('Hello OutcomeComponent Component');
  }

  ngOnChanges() {
    // if (this.outcome && this.outcome.steps) {
    //   this.doneSteps = this.outcome.steps.filter(step => step.done).length;
    // }
  }

  showDetails(): void {
    // if (this.details) {
    //   this.navCtrl.push(OutcomePage, {id: this.outcome.id});
    // } else {
    //   this.rename();
    // }
  }

  clickedTitle(event) {
    // event.stopPropagation();
    // this.rename();
  }

  rename() {
    // let prompt = this.alertCtrl.create({
    //   title: 'Name',
    //   inputs: [
    //     {
    //       name: 'name',
    //       placeholder: 'Name',
    //       value: this.outcome.name
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Save',
    //       handler: data => {
    //         const id = this.outcome.id;
    //         const name = data.name;
    //         this.store.dispatch(new manager.UpdateOutcomeAction({id, changes: {name}}));
    //       }
    //     }
    //   ]
    // });
    // prompt.present();
  }

  delete(): void {
    // this.store.dispatch(new manager.DeleteOutcomeAction(this.outcome.id))
  }

  star() {
    console.log('star');
  }

  setStatus(status: Status) {
    // this.store.dispatch(new manager.UpdateOutcomeAction({id: this.outcome.id, changes: {status}}))
  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      buttons: ['OK'],
      message: e.message,
      title: 'Oops!'
    });

    alert.present();
  }
}
