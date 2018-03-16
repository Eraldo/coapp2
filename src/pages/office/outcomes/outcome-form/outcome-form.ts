import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Status, Statuses} from "../../../../models/status";
import {Scope} from "../../../../models/scope";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import moment from "moment";
import {ScopeService} from "../../../../services/scope/scope";
import {Observable} from "rxjs/Observable";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const OutcomeQuery = gql`
  query OutcomeQuery($id: ID!) {
    outcome(id: $id) {
      id
      name
      status
      scope
      inbox
      start: date
      deadline
      description
    }
  }
`;

const CreateOutcomeMutation = gql`
  mutation CreateOutcome($name: String!, $status: Status!, $scope: Scope!, $inbox: Boolean, $date: DateTime, $deadline: DateTime, $description: String) {
    createOutcome(input: {name: $name, status: $status, scope: $scope, inbox: $inbox, date: $date, deadline: $deadline, description: $description}) {
      outcome {
        id
        name
        status
        scope
        inbox
        start: date
        deadline
        description
      }
    }
  }
`;

const UpdateOutcomeMutation = gql`
  mutation UpdateOutcome($id: ID!, $name: String!, $status: Status!, $scope: Scope!, $inbox: Boolean, $date: DateTime, $deadline: DateTime, $description: String) {
    updateOutcome(input: {id: $id, name: $name, status: $status, scope: $scope, inbox: $inbox, date: $date, deadline: $deadline, description: $description}) {
      outcome {
        id
        name
        status
        scope
        inbox
        start: date
        deadline
        description
      }
    }
  }
`;


@IonicPage()
@Component({
  selector: 'page-outcome-form',
  templateUrl: 'outcome-form.html',
})
export class OutcomeFormPage {
  loading = true;
  query$;
  private form: FormGroup;
  scopes$: Observable<Scope[]>;
  statuses = Statuses;
  now = moment().format();

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private formBuilder: FormBuilder, private scopeService: ScopeService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomeFormPage');
  }

  ngOnInit() {
    this.scopes$ = this.scopeService.scopes$;
    const id = this.navParams.get('id');
    const initial = this.navParams.get('initial') || {};
    this.scopeService.scope$.subscribe(scope => {
      this.form = this.formBuilder.group({
        id: [],
        name: ['', [Validators.required, Validators.minLength(4)]],
        status: [Status.CURRENT.toUpperCase(), Validators.required],
        scope: [scope.toUpperCase(), Validators.required],
        inbox: [false],
        start: [],
        deadline: [],
        description: [''],
      });
    });
    if (id) {
      this.apollo.watchQuery<any>({
        query: OutcomeQuery,
        variables: {id}
      }).subscribe(({data, loading}) => {
        this.loading = loading;
        this.form.patchValue(data.outcome);
      })
    } else {
      this.loading = false;
      // Using initial data for updating the form.
      if (initial) {
        this.form.patchValue(initial);
      }
    }
  }

  save() {
    if (this.form.valid) {
      const outcome = this.form.value;
      if (!outcome.id) {
        this.apollo.mutate({
          mutation: CreateOutcomeMutation,
          variables: {
            name: outcome.name,
            status: outcome.status.toUpperCase(),
            scope: outcome.scope.toUpperCase(),
            inbox: outcome.inbox,
            date: outcome.start,
            deadline: outcome.deadline,
            description: outcome.description
          },
        }).subscribe(({data}) => {
          let outcome = data.createOutcome.outcome;
          let toast = this.toastCtrl.create({
            message: 'Outcome was created successfully',
            duration: 3000,
            showCloseButton: true,
            closeButtonText: "Details"
          });
          toast.onDidDismiss((data, role) => {
            if (role == "close") {
              // Open the outcome detail page.
              this.navCtrl.push('OutcomePage', {id: outcome.id});
            }
          });
          toast.present();
        }, console.error);
        this.navCtrl.pop();
      } else {
        this.apollo.mutate({
          mutation: UpdateOutcomeMutation,
          variables: {
            id: outcome.id,
            name: outcome.name,
            status: outcome.status.toUpperCase(),
            scope: outcome.scope.toUpperCase(),
            inbox: outcome.inbox,
            date: outcome.start,
            deadline: outcome.deadline,
            description: outcome.description
          }
        }).subscribe();
        this.navCtrl.pop();
      }
    }
  }

}
