import {Component, Input} from '@angular/core';
import {Outcome} from "../../models/outcome";
import {AlertController, NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'outcomes',
  templateUrl: 'outcomes.html'
})
export class OutcomesComponent {
  @Input() outcomes: Outcome[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    console.log('Hello OutcomesComponent Component');
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
