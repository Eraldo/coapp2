import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Platform} from 'ionic-angular';
import {Outcome} from "../../../../models/outcome";
import {OutcomeService} from "../../../../services/outcome/outcome";
import {Scopes} from "../../../../models/scope";
import moment from "moment";

@IonicPage()
@Component({
  selector: 'page-outcome',
  templateUrl: 'outcome.html',
})
export class OutcomePage implements OnInit {
  id: string;
  outcome: Outcome;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private outcomeService: OutcomeService, private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    const id = this.navParams.get('id');
    this.outcomeService.getOutcome$(id).subscribe(outcome => this.outcome = outcome)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomePage');
  }

  edit() {
    // this.navCtrl.push(OutcomeFormPage, {outcome: this.outcome});
  }

  delete() {
    this.outcomeService.deleteOutcome$(this.outcome.id)
      .subscribe(() => this.navCtrl.pop())
  }

  toggleInbox() {
    this.outcomeService.updateOutcome$(this.outcome.id, {inbox: !this.outcome.inbox})
      .subscribe(outcome => this.outcome = outcome)
  }

  chooseScope() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Scope');

    Scopes.forEach((scope) => {
      alert.addInput({
        type: 'radio',
        label: scope.toString(),
        value: scope.toString(),
        checked: scope == this.outcome.scope
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == this.outcome.scope) {
          // Scope has not changed.
          return
        }
        console.log(`Selected scope: ${data}`);
        this.outcome.scope = data;
        this.outcomeService.updateOutcome$(this.outcome.id, {scope: data})
          .subscribe(outcome => this.outcome = outcome)
      }
    });
    alert.present();
  }

  chooseStart() {
    if (this.platform.is('cordova')) {
      // DatePicker.show({
      //   date: new Date(),
      //   mode: 'datetime'
      // }).then(
      //   // TODO: implement logic
      //   date => console.log('Got date: ', date),
      //   err => console.log('Error occurred while getting date: ', err)
      // );
    } else {
      let alert = this.alertCtrl.create();
      alert.setTitle('Start');

      alert.addInput({
        type: 'date',
        name: 'date',
        value: this.outcome.start ? moment(this.outcome.start).format('YYYY-MM-DD') : null,
      });
      alert.addInput({
        type: 'time',
        name: 'time',
        value: this.outcome.start && moment(this.outcome.start).format('HH:mm') != '00:00' ? moment(this.outcome.start).format('HH:mm') : null,
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          console.log(`Selected start: ${data.date} ${data.time}`);

          let start = data.date ? moment(`${data.date} ${data.time}`).format('YYYY-MM-DD') : null;

          // check if start has changed (could both be null)
          if (start == moment(this.outcome.start).format('YYYY-MM-DD')) {
            // Start has not changed.
            return;
          }
          console.log(`Changed from ${this.outcome.start} to ${start}`);

          this.outcomeService.updateOutcome$(this.outcome.id, {'start': start})
            .subscribe(outcome => this.outcome = outcome)
        }
      });
      alert.present();
    }
  }

  chooseDeadline() {
    if (this.platform.is('cordova')) {
      // DatePicker.show({
      //   date: new Date(),
      //   mode: 'datetime'
      // }).then(
      //   // TODO: implement logic
      //   date => console.log('Got date: ', date),
      //   err => console.log('Error occurred while getting date: ', err)
      // );
    } else {
      let alert = this.alertCtrl.create();
      alert.setTitle('Deadline');

      alert.addInput({
        type: 'date',
        name: 'date',
        value: this.outcome.deadline ? moment(this.outcome.deadline).format('YYYY-MM-DD') : null,
      });
      alert.addInput({
        type: 'time',
        name: 'time',
        value: this.outcome.deadline && moment(this.outcome.deadline).format('HH:mm') != '00:00' ? moment(this.outcome.start).format('HH:mm') : null,
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          console.log(`Selected deadline: ${data.date} ${data.time}`);

          let deadline = data.date ? moment(`${data.date} ${data.time}`).format('YYYY-MM-DD') : null;

          // check if deadline has changed (could both be null)
          if (deadline == moment(this.outcome.deadline).format('YYYY-MM-DD')) {
            // Deadline has not changed.
            return;
          }
          console.log(`Changed from ${this.outcome.deadline} to ${deadline}`);

          this.outcomeService.updateOutcome$(this.outcome.id, {'deadline': deadline})
            .subscribe(outcome => this.outcome = outcome)
        }
      });
      alert.present();
    }
  }
}
