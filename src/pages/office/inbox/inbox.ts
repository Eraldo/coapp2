import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Scope} from "../../../models/scope";
import {Status, Statuses} from "../../../models/status";
import {Observable} from "rxjs/Observable";
import {PartialOutcome} from "../../../models/outcome";
import moment from "moment";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {ScopeService} from "../../../services/scope/scope";

const OutcomeQuery = gql`
  query Outcome($id: ID!) {
    outcome(id: $id) {
      id
      name
      status
      description
      scope
      start: date
      deadline
      inbox
      owner {
        id
      }
    }
  }
`;

const InboxOutcomesQuery = gql`
  query InboxOutcomes {
    myUser {
      id
      outcomes(inbox: true) {
        edges {
          node {
            id
            name
            status
            scope
            start: date
            deadline
            description
          }
        }
      }
    }
  }
`;

const CreateOutcomeMutation = gql`
  mutation CreateOutcome($name: String!, $status: Status!, $scope: Scope!, $date: DateTime, $deadline: DateTime, $description: String) {
    createOutcome(input: {name: $name, status: $status, scope: $scope, date: $date, deadline: $deadline, description: $description}) {
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

const DeleteOutcomeMutation = gql`
  mutation DeleteOutcome($id: ID!) {
    deleteOutcome(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  loading = true;
  query$;
  outcome: PartialOutcome = {status: Status.CURRENT, scope: Scope.DAY, inbox: true};
  form: FormGroup;
  scopes$: Observable<Scope[]>;
  statuses: Status[];
  now = moment().format();

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private apollo: Apollo, public scopesService: ScopeService) {
    // this.scopes$ = this.outcomeService.createableScopes$;
    this.scopes$ = this.scopesService.scopes$;
    this.statuses = Statuses;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      name: [, [Validators.required, Validators.minLength(4)]],
      status: [, Validators.required],
      scope: [, Validators.required],
      start: [],
      deadline: [],
      description: [],
      // steps: [''],
    });
    this.query$ = this.apollo.watchQuery<any>({
      query: InboxOutcomesQuery
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && data.myUser.outcomes && data.myUser.outcomes.edges[0]) {
        const outcome = data.myUser.outcomes.edges[0].node;
        this.outcome = outcome;
        this.form.patchValue({
          id: outcome.id,
          name: outcome.name,
          status: outcome.status.toLowerCase(),
          scope: outcome.scope.toLowerCase(),
          start: outcome.start,
          deadline: outcome.deadline,
          description: outcome.description
        })
      }
    })
  }

  newOutcome() {
    this.navCtrl.push("OutcomeFormPage", {initial: {inbox: true}})
  }

  delete() {
    console.log(this.outcome, this.form.value);
    const id = this.outcome.id;
    this.apollo.mutate({
      mutation: DeleteOutcomeMutation,
      variables: {id},
      refetchQueries: [
        {query: OutcomeQuery, variables: {id}},
        {query: InboxOutcomesQuery},
      ]
    }).subscribe(() => this.query$.refetch());
  }

  save() {
    console.log(this.outcome, this.form.value);
    const outcome = this.form.value;
    if (this.form.valid) {
      if (!outcome.id) {
        this.apollo.mutate({
          mutation: CreateOutcomeMutation,
          variables: {
            name: outcome.name,
            status: outcome.status.toUpperCase(),
            scope: outcome.scope.toUpperCase(),
            date: outcome.start,
            deadline: outcome.deadline,
            description: outcome.description
          },
          refetchQueries: [
            {query: InboxOutcomesQuery},
          ]
        }).subscribe(() => this.query$.refetch())
      } else {
        outcome.inbox = false;
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
          },
          refetchQueries: [
            {query: InboxOutcomesQuery},
          ]
        }).subscribe(() => this.query$.refetch())
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

}
