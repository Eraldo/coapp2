import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PartialFocus} from "../../../../models/focus";
import {Outcome} from "../../../../models/outcome";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const FocusQuery = gql`
  query FocusQuery($scope: String!, $start: String!) {
    user: myUser {
      id
      focuses(scope: $scope, start: $start, first: 1) {
        edges {
          node {
            id
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
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-focus-form',
  templateUrl: 'focus-form.html',
})
export class FocusFormPage {
  loading = true;
  query$;
  focus: PartialFocus;
  outcomes: Outcome[];
  private form: FormGroup;
  ordering = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const scope = this.navParams.get('scope');
    const start = this.navParams.get('start');
    if (!(scope && start)) {
      // Not enough data!
      this.navCtrl.pop();
    }
    this.form = this.formBuilder.group({
      outcome1: [],
      outcome2: [],
      outcome3: [],
      outcome4: [],
      reason: [],
    }, {
      validator: this.validateFocus
    });

    this.query$ = this.apollo.watchQuery({
      query: FocusQuery,
      variables: {scope, start}
    });

    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.focus = data && data.user.focuses && data.user.focuses.edges && data.user.focuses.edges[0] || {scope, start};
      if (this.focus.id) {
        this.form.patchValue(this.focus);
        this.form.controls['reason'].setValidators(Validators.required);
      }
    })
  }

  validateFocus(group: FormGroup) {
    var outcome1 = group.controls['outcome1'].value;
    var outcome2 = group.controls['outcome2'].value;
    var outcome3 = group.controls['outcome3'].value;
    var outcome4 = group.controls['outcome4'].value;

    // Checking if there is an outcome.
    if (!(outcome1 || outcome2 || outcome3 || outcome4)) {
      // group.setErrors({outcome1: 'Focus required'}, {emitEvent: true});
      return {noOutcome: true};
      // return null;
    }

    // TODO: Checking to make sure no outcome is set multiple times.
    // TODO: Checking to make sure that all outcomes have the same scope as the focus.
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FocusFormPage');
  }

  save() {
    if (this.form.valid) {
      const id = this.focus.id;
      const outcomes = this.form.value;
      if (this.focus.id) {
        // Updating Focus.
        console.log('>> update focus', id, outcomes, outcomes.reason);
        // this.focusService.updateFocus(id, outcomes, outcomes.reason);
        this.navCtrl.pop();
      } else {
        // Creating new Focus.
        const scope = this.focus.scope;
        const start = this.focus.start;
        const focus = {scope, start, ...outcomes};
        console.log('>> set focus', focus);
        // this.focusService.addFocus(focus);
        this.navCtrl.pop()
      }
    }
  }

  toggleOrdering() {
    this.ordering = !this.ordering;
  }

  reorder(indexes) {
    // Change values of indexes.from and indexes.to
    const fromField = `outcome${indexes.from + 1}`;
    const toField = `outcome${indexes.to + 1}`;
    const fromValue = this.form.value[fromField];
    const toValue = this.form.value[toField];
    let changes = {};
    changes[fromField] = toValue;
    changes[toField] = fromValue;
    console.log(changes);
    this.form.patchValue(changes, {emitEvent: true});
  }

  reset(index) {
    const field = `outcome${index + 1}`;
    let changes = {};
    changes[field] = null;
    this.form.patchValue(changes, {emitEvent: true});
  }
}
