import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Outcome} from "../../models/outcome";
import {Status, Statuses} from "../../models/status";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {OutcomeService} from "../../services/outcome/outcome";
import {FocusService} from "../../services/focus/focus";

@Component({
  selector: 'outcome',
  templateUrl: 'outcome.html'
})
export class OutcomeComponent {
  @Input() outcome: Outcome;
  @Input() details = true;
  @Input() showStar = true;
  @Input() showSelection = false;
  @Output() selected = new EventEmitter();
  statuses = Statuses;
  doneSteps = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public outcomeService: OutcomeService, public focusService: FocusService, public alertCtrl: AlertController) {
    console.log('Hello OutcomeComponent Component');
  }

  ngOnChanges() {
    // if (this.outcome && this.outcome.steps) {
    //   this.doneSteps = this.outcome.steps.filter(step => step.done).length;
    // }
  }

  showDetails(): void {
    if (this.details) {
      this.navCtrl.push('OutcomePage', {id: this.outcome.id});
    } else {
      this.rename();
    }
  }

  clickedTitle(event) {
    event.stopPropagation();
    this.rename();
  }

  rename() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.outcome.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const id = this.outcome.id;
            const name = data.name;
            this.outcomeService.updateOutcome(id, {name});
          }
        }
      ]
    });
    prompt.present();
  }

  delete(): void {
    this.outcomeService.deleteOutcome(this.outcome.id);
    if (!this.details) {
      this.navCtrl.pop()
    }
  }

  star() {
    // if (!this.outcome.isFocus) {
    //   this.focusService.setFocus$(this.outcome.scope, moment().format('YYYY-MM-DD'), this.outcome.id)
    //     .subscribe(focus => this.outcome.isFocus = true)
    // } else {
    //   this.focusService.unsetFocus$(this.outcome.scope, moment().format('YYYY-MM-DD'), this.outcome.id)
    //     .subscribe(focus => this.outcome.isFocus = false)
    // }
  }

  setStatus(status: Status) {
    this.outcomeService.updateOutcome(this.outcome.id, {status})
  }

  select() {
    this.selected.next(this.outcome)
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
