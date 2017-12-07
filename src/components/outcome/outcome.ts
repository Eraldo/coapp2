import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Status, Statuses} from "../../models/status";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

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
      steps {
        edges {
          node {
            id
            completedAt
          }
        }
      }
      tags {
        edges {
          node {
            id
          }
        }
      }
    }
    viewer {
      id
    }
  }
`;

const SetOutcomeStatusMutation = gql`
  mutation SetOutcomeStatus($id: ID!, $status: Status!) {
    updateOutcome(input: {id: $id, status: $status}) {
      success
      outcome {
        id
        status
      }
    }
  }
`;

const RenameOutcomeMutation = gql`
  mutation RenameOutcome($id: ID!, $name: String!) {
    updateOutcome(input: {id: $id, name: $name}) {
      success
      outcome {
        id
        name
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

@Component({
  selector: 'outcome',
  templateUrl: 'outcome.html'
})
export class OutcomeComponent {
  @Input() id: string;
  @Input() details = true;
  @Input() showStar = true;
  @Input() showSelection = false;
  @Output() selected = new EventEmitter();
  loading = true;
  outcome;
  statuses = Statuses;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController) {
    console.log('Hello OutcomeComponent Component');
  }

  get totalSteps() {
    return this.outcome.steps.edges.length
  }

  get completedSteps() {
    return this.outcome.steps.edges.filter(edge => !!edge.node.completedAt).length
  }

  get totalTags() {
    return this.outcome.tags.edges.length
  }

  ngOnChanges() {
    this.apollo.watchQuery<any>({query: OutcomeQuery, variables: {id: this.id}})
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.outcome = data.outcome;
        this.user = data.viewer;
      });
  }

  get viewOnly() {
    return this.outcome.owner.id != this.user.id;
  }

  showDetails(): void {
    if (this.details) {
      this.navCtrl.push('OutcomePage', {id: this.outcome.id});
    } else {
      this.rename();
    }
  }

  clickedTitle(event) {
    // event.stopPropagation();
    // this.rename();
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
            this.apollo.mutate({
              mutation: RenameOutcomeMutation,
              variables: {id, name}
            })
          }
        }
      ]
    });
    prompt.present();
  }

  delete(): void {
    const id = this.outcome.id;
    this.apollo.mutate({
      mutation: DeleteOutcomeMutation,
      variables: {id},
      refetchQueries: [{query: OutcomeQuery, variables: {id}}]
    });
    if (!this.details) {
      this.navCtrl.pop()
    }
  }

  star() {
  }

  setStatus(status: Status) {
    this.apollo.mutate({
      mutation: SetOutcomeStatusMutation,
      variables: {id: this.outcome.id, status: status.toUpperCase()}
    })
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
