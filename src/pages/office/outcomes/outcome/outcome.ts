import {Component, OnInit} from '@angular/core';
import {
  IonicPage, NavController, NavParams, AlertController, Platform, ToastController,
  ModalController
} from 'ionic-angular';
import {Scopes} from "../../../../models/scope";
import moment from "moment";
import {DatePicker} from "@ionic-native/date-picker";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {SessionsService} from "../../../../services/sessions/sessions";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Icon} from "../../../../models/icon";
import {OutcomeFragment} from "../../../../services/outcome/outcome";
import {AudioService, Sound} from "../../../../services/audio/audio";

const OutcomeQuery = gql`
  query OutcomeQuery($id: ID!) {
    outcome(id: $id) {
      ...Outcome
    }
  }
  ${OutcomeFragment}
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
  mutation SetOutcomeDate($id: ID!, $date: Date, $deletions: [String]) {
    updateOutcome(input: {id: $id, date: $date, deletions: $deletions}) {
      outcome {
        id
        date
      }
    }
  }
`;

const SetOutcomeDeadlineMutation = gql`
  mutation SetOutcomeDeadline($id: ID!, $deadline: Date, $deletions: [String]) {
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

const SetOutcomeTagsMutation = gql`
  mutation SetOutcomeTags($id: ID!, $tags: [ID]) {
    updateOutcome(input: {id: $id, tags: $tags}) {
      success
    }
  }
`;

const SetOutcomeDescriptionMutation = gql`
  mutation SetOutcomeDescription($id: ID!, $description: String!) {
    updateOutcome(input: {id: $id, description: $description}) {
      outcome {
        id
        description
      }
    }
  }
`;

const SetRelatedOutcomesMutation = gql`
  mutation SetRelatedOutcomes($id: ID!, $outcomes: [ID]) {
    setRelatedOutcomes(input: {id: $id, outcomes: $outcomes}) {
      outcome {
        id
        relatedOutcomes {
          edges {
            node {
              id
              ...Outcome
            }
          }
        }
      }
    }
  }
  ${OutcomeFragment}
`;


@IonicPage({
  segment: 'outcome/:id'
})
@Component({
  selector: 'page-outcome',
  templateUrl: 'outcome.html',
})
export class OutcomePage implements OnInit {
  icons;
  loading = true;
  query$;
  outcome;
  private stepForm: FormGroup;
  reorder = false;

  get steps() {
    return this.outcome.steps.edges.map(edge => edge.node)
  }

  get completedSteps() {
    return this.steps.filter(step => !!step.completedAt).length
  }

  get tags() {
    return this.outcome.tags.edges.map(edge => edge.node);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private apollo: Apollo, private alertCtrl: AlertController, private datePicker: DatePicker, private sessionService: SessionsService, private formBuilder: FormBuilder, public toastCtrl: ToastController, private modalCtrl: ModalController, public audioService: AudioService) {
    this.icons = Icon;
    this.stepForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery<any>({
      query: OutcomeQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.outcome = data.outcome;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomePage');
  }

  deleteOutcome() {
    const id = this.outcome.id;
    this.apollo.mutate({
      mutation: DeleteOutcomeMutation,
      variables: {id},
      refetchQueries: [{query: OutcomeQuery, variables: {id}}]
    }).subscribe(() => {
      this.audioService.play(Sound.DELETE);
    });
    this.navCtrl.pop()
  }

  toggleInbox() {
    this.apollo.mutate({
      mutation: SetOutcomeInboxMutation,
      variables: {id: this.outcome.id, inbox: !this.outcome.inbox}
    }).subscribe();
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
        }).subscribe();
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
        }).subscribe();
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
        }).subscribe();
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
        }).subscribe();
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
        }).subscribe();
      }
    });
    alert.present();
  }

  updateNotes() {
    // this.edit();
    const content = this.outcome.description;
    const title = 'Outcome details';
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: SetOutcomeDescriptionMutation,
          variables: {id: this.outcome.id, description: data.content}
        }).subscribe();
      }
    });
    textModal.present();
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

  resetTimer() {
    this.sessionService.reset();
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

  get duration() {
    return this.sessionService.duration;
  }

  submitStep() {
    if (this.stepForm.valid) {
      const name = this.stepForm.value.name;
      if (!this.startsWithVerb(name)) {
        let toast = this.toastCtrl.create({
          message: 'Tip: Start with a verb (ending in -ing) to make sure it is a doable step.',
          duration: 3000
        });
        toast.present();
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
    }).subscribe();
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
              }).subscribe();
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
    if (string) {
      return string.split(' ')[0].slice(-3) == 'ing'
    }
  }

  deleteStep(id) {
    this.apollo.mutate({
      mutation: DeleteStepMutation,
      variables: {id},
      refetchQueries: [{query: OutcomeQuery, variables: {id: this.outcome.id}}]
    }).subscribe();
  }

  reorderSteps(indexes) {
    const from = this.outcome.steps.edges[indexes.from].node;
    const to = this.outcome.steps.edges[indexes.to].node;

    this.apollo.mutate({
      mutation: UpdateStepMutation,
      variables: {id: from.id, order: to.order},
      refetchQueries: [{query: OutcomeQuery, variables: {id: this.outcome.id}}]
    }).subscribe();
  }

  editTags() {
    const currentIds = this.tags.map(tag => tag.id);
    let tagsSelectModal = this.modalCtrl.create('TagsSelectPage', {selected: currentIds.slice()});
    tagsSelectModal.onDidDismiss(ids => this.setTags(ids));
    tagsSelectModal.present();
  }

  removeTag(id: string) {
    const ids = this.outcome.tags.edges
      .map(edge => edge.node.id)
      .filter(tagId => tagId != id);
    this.setTags(ids)
  }

  private setTags(ids: string[]) {
    const currentIds = this.tags.map(tag => tag.id);
    // Tags changed: Change outcome tags.
    if (ids && JSON.stringify(ids.sort()) != JSON.stringify(currentIds.sort())) {
      this.apollo.mutate({
        mutation: SetOutcomeTagsMutation,
        variables: {id: this.outcome.id, tags: ids},
        refetchQueries: [{query: OutcomeQuery, variables: {id: this.outcome.id}}]
      }).subscribe();
    }
  }

  setRelatedOutcomes() {
    let modal = this.modalCtrl.create('OutcomeSelectPage', {
      excludedIds: [this.outcome.id],
      selectedIds: this.outcome.relatedOutcomes.edges.map(edge => edge.node.id),
      multiple: true
    });
    modal.onDidDismiss(ids => {
      if (ids) {
        // Setting related.
        const relatedOutcomes = ids;
        this.apollo.mutate({
          mutation: SetRelatedOutcomesMutation,
          variables: {
            id: this.outcome.id,
            outcomes: relatedOutcomes
          },
        }).subscribe();
      }
    });
    modal.present();
  }

  showLink() {
    let alert = this.alertCtrl.create({
      title: 'Outcome Link',
      message: `https://www.coLegend.org/#/outcome/${this.outcome.id}`,
      buttons: ['Close']
    });
    alert.present();
  }

}
