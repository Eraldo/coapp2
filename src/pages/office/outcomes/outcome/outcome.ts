import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Platform, ToastController} from 'ionic-angular';
import {Scopes} from "../../../../models/scope";
import moment from "moment";
import {DatePicker} from "@ionic-native/date-picker";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {SessionsService} from "../../../../services/sessions/sessions";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MarkdownService} from "angular2-markdown";

const OutcomeQuery = gql`
  query OutcomeQuery($id: ID!) {
    outcome(id: $id) {
      id
      name
      description
      status
      scope
      inbox
      start: date
      deadline
      steps {
        edges {
          node {
            id
            name
            order
            completedAt
          }
        }
      }
    }
  }
`;

const SetOutcomeStatusMutation = gql`
  mutation SetOutcomeStatus($id: ID!, $status: Status!) {
    updateOutcome(input: {id: $id, status: $status}) {
      outcome {
        id
        status
      }
    }
  }
`;

const SetOutcomeScopeMutation = gql`
  mutation SetOutcomeScope($id: ID!, $scope: Scope!) {
    updateOutcome(input: {id: $id, scope: $scope}) {
      outcome {
        id
        scope
      }
    }
  }
`;

const SetOutcomeInboxMutation = gql`
  mutation SetOutcomeInbox($id: ID!, $inbox: Boolean!) {
    updateOutcome(input: {id: $id, inbox: $inbox}) {
      outcome {
        id
        inbox
      }
    }
  }
`;

const SetOutcomeDateMutation = gql`
  mutation SetOutcomeDate($id: ID!, $date: DateTime, $deletions: [String]) {
    updateOutcome(input: {id: $id, date: $date, deletions: $deletions}) {
      outcome {
        id
        date
      }
    }
  }
`;

const SetOutcomeDeadlineMutation = gql`
  mutation SetOutcomeDeadline($id: ID!, $deadline: DateTime, $deletions: [String]) {
    updateOutcome(input: {id: $id, deadline: $deadline, deletions: $deletions}) {
      outcome {
        id
        deadline
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

const CreateStepMutation = gql`
  mutation CreateStep($outcome: ID!, $name: String!) {
    createStep(input: {outcome: $outcome, name: $name}) {
      success
    }
  }
`;

const UpdateStepMutation = gql`
  mutation UpdateStep($id: ID!, $name: String, $toggle: Boolean, $order: Int) {
    updateStep(input: {id: $id, name: $name, toggle: $toggle, order: $order}) {
      success
    }
  }
`;

const DeleteStepMutation = gql`
  mutation DeleteStep($id: ID!) {
    deleteStep(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-outcome',
  templateUrl: 'outcome.html',
})
export class OutcomePage implements OnInit {
  loading = true;
  outcome;
  private stepForm: FormGroup;

  get completedSteps() {
    return this.outcome.steps.edges.filter(edge => !!edge.node.completedAt).length
  }

  get totalSteps() {
    return this.outcome.steps.edges.length
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private apollo: Apollo, private alertCtrl: AlertController, private datePicker: DatePicker, private sessionService: SessionsService, private formBuilder: FormBuilder, private markdownService: MarkdownService, public toastCtrl: ToastController) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
    this.stepForm = this.formBuilder.group({
      name: ['', Validators.minLength(4)],
    });
  }

  ngOnInit(): void {
    const id = this.navParams.get('id');
    this.apollo.watchQuery<any>({
      query: OutcomeQuery,
      variables: {id}
    }).subscribe(({data, loading}) => {
      this.loading = loading;
      this.outcome = data.outcome;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomePage');
  }

  edit() {
    this.navCtrl.push('OutcomeFormPage', {id: this.outcome.id});
  }

  deleteOutcome() {
    const id = this.outcome.id;
    this.apollo.mutate({
      mutation: DeleteOutcomeMutation,
      variables: {id},
      refetchQueries: [{query: OutcomeQuery, variables: {id}}]
    });
    this.navCtrl.pop()
  }

  toggleInbox() {
    this.apollo.mutate({
      mutation: SetOutcomeInboxMutation,
      variables: {id: this.outcome.id, inbox: !this.outcome.inbox}
    }).subscribe()
  }

  chooseScope() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Scope');

    Scopes.forEach((scope) => {
      alert.addInput({
        type: 'radio',
        label: scope.toString(),
        value: scope.toString(),
        checked: scope == this.outcome.scope.toLowerCase()
      });
    });

    // alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == this.outcome.scope.toLowerCase()) {
          // Scope has not changed.
          return
        }
        const scope = data;
        this.apollo.mutate({
          mutation: SetOutcomeScopeMutation,
          variables: {id: this.outcome.id, scope: scope.toUpperCase()}
        })
      }
    });
    alert.present();
  }

  chooseStart() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Start');

    alert.addInput({
      type: 'date',
      name: 'date',
      value: this.outcome.start ? moment(this.outcome.start).format('YYYY-MM-DD') : null,
    });
    alert.addInput({
      type: 'time',
      name: 'time',
      value: this.outcome.start && moment(this.outcome.start).format('HH:mm') != '00:00' ? moment(this.outcome.start).format('HH:mm') : null,
    });
    alert.addButton({
      text: 'Clear',
      handler: data => {
        this.apollo.mutate({
          mutation: SetOutcomeDateMutation,
          variables: {id: this.outcome.id, deletions: ['date']}
        })
      }
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        // console.log(`Selected start: ${data.date} ${data.time}`);

        let start = data.date ? moment(`${data.date} ${data.time}`).format('YYYY-MM-DD') : null;

        // check if start has changed (could both be null)
        if (start == moment(this.outcome.start).format('YYYY-MM-DD')) {
          // Start has not changed.
          return;
        }
        // console.log(`Changed from ${this.outcome.start} to ${start}`);

        this.apollo.mutate({
          mutation: SetOutcomeDateMutation,
          variables: {id: this.outcome.id, date: start}
        })
      }
    });
    alert.present();
  }

  chooseDeadline() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Deadline');

    alert.addInput({
      type: 'date',
      name: 'date',
      value: this.outcome.deadline ? moment(this.outcome.deadline).format('YYYY-MM-DD') : null,
    });
    alert.addInput({
      type: 'time',
      name: 'time',
      value: this.outcome.deadline && moment(this.outcome.deadline).format('HH:mm') != '00:00' ? moment(this.outcome.start).format('HH:mm') : null,
    });
    alert.addButton({
      text: 'Clear',
      handler: data => {
        this.apollo.mutate({
          mutation: SetOutcomeDeadlineMutation,
          variables: {id: this.outcome.id, deletions: ['deadline']}
        })
      }
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        // console.log(`Selected deadline: ${data.date} ${data.time}`);

        let deadline = data.date ? moment(`${data.date} ${data.time}`).format('YYYY-MM-DD') : null;

        // check if deadline has changed (could both be null)
        if (deadline == moment(this.outcome.deadline).format('YYYY-MM-DD')) {
          // Deadline has not changed.
          return;
        }
        // console.log(`Changed from ${this.outcome.deadline} to ${deadline}`);

        this.apollo.mutate({
          mutation: SetOutcomeDeadlineMutation,
          variables: {id: this.outcome.id, deadline: deadline}
        })
      }
    });
    alert.present();
  }

  updateNotes() {
    this.edit();
  }

  play() {
    this.sessionService.play();
  }

  get paused() {
    return this.sessionService.paused;
  }

  pause() {
    this.sessionService.pause()
  }

  get muted() {
    return this.sessionService.muted;
  }

  mute() {
    this.sessionService.mute();
  }

  unmute() {
    this.sessionService.unmute();
  }

  get currentTime() {
    return this.sessionService.currentTime;
  }

  submitStep() {
    if (this.stepForm.valid) {
      const name = this.stepForm.value.name;
      if (!this.startsWithVerb(name)) {
        let toast = this.toastCtrl.create({
          message: 'Steps need to start with a verb (ending in -ing).',
          duration: 3000
        });
        toast.present();
        return
      }
      this.apollo.mutate({
        mutation: CreateStepMutation,
        variables: {
          outcome: this.outcome.id,
          name: this.stepForm.value.name
        },
        refetchQueries: [{query: OutcomeQuery, variables: {id: this.outcome.id}}]
      }).subscribe(() => {
        this.stepForm.reset();
      })
    }
  }

  toggleStep(id) {
    this.apollo.mutate({
      mutation: UpdateStepMutation,
      variables: {id, toggle: true},
      refetchQueries: [{query: OutcomeQuery, variables: {id: this.outcome.id}}]
    });
  }

  renameStep(id, name) {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: name
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
            const name = data.name;
            // Check if name starts with a verb.
            if (this.startsWithVerb(name)) {
              this.apollo.mutate({
                mutation: UpdateStepMutation,
                variables: {id, name},
                refetchQueries: [{query: OutcomeQuery, variables: {id: this.outcome.id}}]
              })
            } else {
              let toast = this.toastCtrl.create({
                message: 'Steps need to start with a verb (ending in -ing).',
                duration: 3000
              });
              toast.present();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  startsWithVerb(string) {
    return string.split(' ')[0].slice(-3) == 'ing'
  }

  deleteStep(id) {
    this.apollo.mutate({
      mutation: DeleteStepMutation,
      variables: {id},
      refetchQueries: [{query: OutcomeQuery, variables: {id: this.outcome.id}}]
    });
  }
}
