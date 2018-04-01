import {Component, Input} from '@angular/core';
import {ModalController, NavController, NavParams} from "ionic-angular";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import moment from "moment";

const FocusQuery = gql`
  query FocusQuery($id: ID!) {
    focus(id: $id) {
      id
      scope
      start
      end
      outcome1 {
        id
      }
      outcome2 {
        id
      }
      outcome3 {
        id
      }
      outcome4 {
        id
      }
    }
  }
`;

@Component({
  selector: 'focus',
  templateUrl: 'focus.html'
})
export class FocusComponent {
  @Input() id: string;
  loading = true;
  focus;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public modalCtrl: ModalController) {
    console.log('Hello FocusComponent Component');
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.apollo.watchQuery<any>({
      query: FocusQuery,
      variables: {id: this.id}
    }).valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.focus = data.focus;
    })
  }

  update() {
    this.navCtrl.push('FocusFormPage', {scope: this.focus.scope, start: this.focus.start})
  }

  get isEditable() {
    const focus = this.focus;
    if (focus) {
      // Focus is now or in the future.
      return moment().isSameOrBefore(moment(this.focus.end), 'days') // all inclusive
    } else {
      return false;
    }
  }

  // selectOutcome(position: number) {
  //   console.log(`Outcome selection. #${position}`);
  //   let outcomeSelectModal = this.modalCtrl.create('OutcomeSelectPage');
  //   outcomeSelectModal.onDidDismiss(outcome => {
  //     if (outcome) {
  //       let changes = {};
  //       changes[`outcome${position}`] = outcome.id;
  //       this.focusService.updateFocus(this.focus.id, changes)
  //     }
  //   });
  //   outcomeSelectModal.present();
  // }
}
