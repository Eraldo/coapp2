import {Component, Input} from '@angular/core';
import {Focus} from "../../models/focus";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {Outcome} from "../../models/outcome";
import {OutcomeService} from "../../services/outcome/outcome";

@Component({
  selector: 'focus',
  templateUrl: 'focus.html'
})
export class FocusComponent {
  @Input() focus: Focus;
  outcome1$: Observable<Outcome>;
  outcome2$: Observable<Outcome>;
  outcome3$: Observable<Outcome>;
  outcome4$: Observable<Outcome>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private outcomeService: OutcomeService, public alertCtrl: AlertController) {
    console.log('Hello FocusComponent Component');
  }

  ngOnChanges() {
    if (this.focus.outcome1) {
      this.outcome1$ = this.outcomeService.getOutcome$(this.focus.outcome1)
    }
    if (this.focus.outcome2) {
      this.outcome2$ = this.outcomeService.getOutcome$(this.focus.outcome2)
    }
    if (this.focus.outcome3) {
      this.outcome3$ = this.outcomeService.getOutcome$(this.focus.outcome3)
    }
    if (this.focus.outcome4) {
      this.outcome4$ = this.outcomeService.getOutcome$(this.focus.outcome4)
    }
  }
}
