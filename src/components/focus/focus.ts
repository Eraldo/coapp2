import {Component, Input} from '@angular/core';
import {Focus} from "../../models/focus";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {Outcome} from "../../models/outcome";
import {OutcomeService} from "../../services/outcome/outcome";
import {FocusService} from "../../services/focus/focus";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private outcomeService: OutcomeService, public modalCtrl: ModalController, private focusService: FocusService) {
    console.log('Hello FocusComponent Component');
  }

  ngOnChanges() {
    this.outcome1$ = this.outcomeService.getOutcome$({id: this.focus.outcome1});
    this.outcome2$ = this.outcomeService.getOutcome$({id: this.focus.outcome2});
    this.outcome3$ = this.outcomeService.getOutcome$({id: this.focus.outcome3});
    this.outcome4$ = this.outcomeService.getOutcome$({id: this.focus.outcome4})
  }

  update() {
    const scope = this.focus.scope;
    const start = this.focus.start;
    this.navCtrl.push('FocusFormPage', {scope, start})
  }

  selectOutcome(position: number) {
    console.log(`Outcome selection. #${position}`);
    let outcomeSelectModal = this.modalCtrl.create('OutcomeSelectPage');
    outcomeSelectModal.onDidDismiss(outcome => {
      if (outcome) {
        let changes = {};
        changes[`outcome${position}`] = outcome.id;
        this.focusService.updateFocus(this.focus.id, changes)
      }
    });
    outcomeSelectModal.present();
  }
}
