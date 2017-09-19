import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Platform} from 'ionic-angular';
import {Outcome} from "../../../../models/outcome";
import {Scopes} from "../../../../models/scope";
import moment from "moment";
import {DatePicker} from "@ionic-native/date-picker";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

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
  mutation SetOutcomeDate($id: ID!, $date: DateTime!) {
    updateOutcome(input: {id: $id, date: $date}) {
      outcome {
        id
        date
      }
    }
  }
`;

const SetOutcomeDeadlineMutation = gql`
  mutation SetOutcomeDeadline($id: ID!, $deadline: DateTime!) {
    updateOutcome(input: {id: $id, deadline: $deadline}) {
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

@IonicPage()
@Component({
  selector: 'page-outcome',
  templateUrl: 'outcome.html',
})
export class OutcomePage implements OnInit {
  loading = true;
  outcome: Outcome;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private apollo: Apollo, private alertCtrl: AlertController, private datePicker: DatePicker) {
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

  act() {
    this.navCtrl.push('ActionPage', {id: this.outcome.id});
  }

  delete() {
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

    alert.addButton('Cancel');
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
    if (this.platform.is('cordova')) {
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        titleText: 'Start',
        todayText: 'today'
      }).then(
        date => {
          const start = moment(date).format('YYYY-MM-DD');
          this.apollo.mutate({
            mutation: SetOutcomeDateMutation,
            variables: {id: this.outcome.id, date: start}
          })
        },
        err => console.log('Error occurred while getting start date: ', err)
      );
    } else {
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

      alert.addButton('Cancel');
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
  }

  chooseDeadline() {
    if (this.platform.is('cordova')) {
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        titleText: 'Deadline',
        todayText: 'today'
      }).then(
        date => {
          const deadline = moment(date).format('YYYY-MM-DD');
          this.apollo.mutate({
            mutation: SetOutcomeDeadlineMutation,
            variables: {id: this.outcome.id, deadline: deadline}
          })
        },
        err => console.log('Error occurred while getting deadline date: ', err)
      );
    } else {
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

      alert.addButton('Cancel');
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
  }
}
