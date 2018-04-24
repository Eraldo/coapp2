import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PartialFocus} from "../../../../models/focus";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {ExperienceQuery} from "../../../../components/app-toolbar/app-toolbar";
import {Icon} from "../../../../models/icon";

const FocusQuery = gql`
  query FocusQuery($scope: String!, $start: Date!) {
    user: viewer {
      id
      focuses(scope: $scope, start: $start) {
        edges {
          node {
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
      }
    }
  }
`;

const SetFocusMutation = gql`
  mutation SetFocus($scope: Scope!, $start: Date!, $outcome1: ID!, $outcome2: ID, $outcome3: ID, $outcome4: ID) {
    updateFocus(input: {scope: $scope, start: $start, outcome1: $outcome1, outcome2: $outcome2, outcome3: $outcome3, outcome4: $outcome4}) {
      focus {
        id
        scope
        start
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
`;

const UpdateFocusMutation = gql`
  mutation UpdateFocus($id: ID!, $outcome1: ID!, $outcome2: ID, $outcome3: ID, $outcome4: ID, $reason: String!) {
    updateFocus(input: {id: $id, outcome1: $outcome1, outcome2: $outcome2, outcome3: $outcome3, outcome4: $outcome4, reason: $reason}) {
      focus {
        id
        scope
        start
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
`;

@IonicPage()
@Component({
  selector: 'page-focus-form',
  templateUrl: 'focus-form.html',
})
export class FocusFormPage {
  icons;
  loading = true;
  query$;
  focus: PartialFocus;
  private form: FormGroup;
  ordering = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder) {
    this.icons = Icon;
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

    this.query$ = this.apollo.watchQuery<any>({
      query: FocusQuery,
      variables: {scope: scope.toLowerCase(), start}
    });

    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      const focus = data && data.user.focuses && data.user.focuses.edges && data.user.focuses.edges[0] && data.user.focuses.edges[0].node || {scope, start};
      this.focus = focus;
      if (focus.id) {
        this.form.patchValue({
          ...focus,
          outcome1: focus.outcome1 && focus.outcome1.id,
          outcome2: focus.outcome2 && focus.outcome2.id,
          outcome3: focus.outcome3 && focus.outcome3.id,
          outcome4: focus.outcome4 && focus.outcome4.id,
        });
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

  get excludedIds() {
    const focus = this.form.value;
    return [focus.outcome1, focus.outcome2, focus.outcome3, focus.outcome4]
  }

  save() {
    if (this.form.valid) {
      const id = this.focus.id;
      const outcomes = this.form.value;
      if (this.focus.id) {
        // Updating Focus.
        this.apollo.mutate({
          mutation: UpdateFocusMutation,
          variables: {
            id,
            ...outcomes,
            reason: outcomes.reason
          }
        }).subscribe(() => this.navCtrl.pop());
      } else {
        // Creating new Focus.
        const scope = this.focus.scope.toUpperCase();
        const start = this.focus.start;
        const focus = {scope, start, ...outcomes};
        this.apollo.mutate({
          mutation: SetFocusMutation,
          variables: focus,
          refetchQueries: [{query: ExperienceQuery}]
        }).subscribe(() => this.navCtrl.pop());
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
