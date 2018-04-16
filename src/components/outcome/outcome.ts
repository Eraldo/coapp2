import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Status, Statuses} from "../../models/status";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import moment from "moment";
import {Icon} from "../../models/icon";

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

const SetOutcomeStatusDescriptionMutation = gql`
  mutation SetOutcomeStatusDescription($id: ID!, $status: Status!, $description: String!) {
    updateOutcome(input: {id: $id, status: $status, description: $description}) {
      success
      outcome {
        id
        status
        description
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
  @Input() showStar = false;
  @Input() showSelection = false;
  @Output() selected = new EventEmitter();
  loading = true;
  outcome;
  statuses = Statuses;
  user;
  icons;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController) {
    console.log('Hello OutcomeComponent Component');
    this.icons = Icon;
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
      .valueChanges.subscribe(({data, loading}) => {
        this.loading = loading;
        this.outcome = data.outcome;
        this.user = data.viewer;
      });
  }

  get isDue() {
    const today = moment().format('YYYY-MM-DD');
    return this.outcome.deadline == today;
  }

  get isOverdue() {
    const today = moment().format('YYYY-MM-DD');
    return this.outcome.deadline < today;
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
            }).subscribe();
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
    }).subscribe();
    if (!this.details) {
      this.navCtrl.pop()
    }
  }

  star() {
  }

  setStatus(status: Status) {
    const id = this.outcome.id;
    if (status == Status.WAITING) {
      this.getWaitingReason().then(reason => this.updateStatus(status, reason))
    } else {
      this.updateStatus(status)
    }
  }

  private getWaitingReason(): Promise<string> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Waiting Reason',
        message: "What are you waiting for?",
        inputs: [
          {
            name: 'reason',
            placeholder: 'Reason'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              resolve();
            }
          },
          {
            text: 'Save',
            handler: data => {
              resolve(data.reason);
            }
          }
        ]
      });
      alert.present();
    });
  }

  private updateStatus(status: Status, reason = undefined) {
    let variables = {
      id: this.outcome.id,
      status: status.toUpperCase(),
    };
    if (reason) {
      const timestamp = moment().format('YYYY-MM-DD HH:mm');
      const statusMessage = `[${timestamp}] Changed Status to waiting: ${reason}`;
      variables['description'] = `${this.outcome.description}${this.outcome.description ? '\n\n' : ''}${statusMessage}`;
    }
    const mutation = reason ? SetOutcomeStatusDescriptionMutation : SetOutcomeStatusMutation;
    this.apollo.mutate({
      mutation,
      variables
    }).subscribe();
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
