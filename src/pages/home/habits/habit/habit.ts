import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Icon} from "../../../../models/icon";
import {Apollo} from "apollo-angular";
import {Scopes} from "../../../../models/scope";

export const HabitFragment = gql`
  fragment HabitFields on HabitNode {
    id
    name
    content
    duration
    icon
    scope
    order
    isActive
    isTracked
    isControlled
    streak
    streakMax
    stats
  }
`;

const HabitQuery = gql`
  query HabitQuery($id: ID!) {
    habit(id: $id) {
      ...HabitFields
      routines {
        edges {
          node {
            id
            name
          }
        }
      }
      reminders {
        edges {
          node {
            id
            time
          }
        }
      }
      tracks: trackEvents {
        edges {
          node {
            id
            created
          }
        }
      }
    }
  }
  ${HabitFragment}
`;

export const UpdateHabitMutation = gql`
  mutation UpdateHabit($id: ID!, $name: String, $scope: Scope, $icon: String, $isActive: Boolean, $duration: String, $content: String, $order: Int) {
    updateHabit(input: {id: $id, name: $name, scope: $scope, icon: $icon, duration: $duration, isActive: $isActive, content: $content, order: $order}) {
      habit {
        ...HabitFields
      }
    }
  }
  ${HabitFragment}
`;

export const TrackHabitMutation = gql`
  mutation TrackHabit($id: ID!) {
    trackHabit(input: {id: $id}) {
      track {
        id
        created
      }
    }
  }
`;

const DeleteHabitMutation = gql`
  mutation DeleteHabit($id: ID!) {
    deleteHabit(input: {id: $id}) {
      success
    }
  }
`;

const DeleteHabitTrackMutation = gql`
  mutation DeleteHabitTrack($id: ID!) {
    deleteHabitTrack(input: {id: $id}) {
      success
    }
  }
`;

@IonicPage({
  segment: 'habit/:id'
})
@Component({
  selector: 'page-habit',
  templateUrl: 'habit.html',
})
export class HabitPage {
  icons;
  loading = true;
  query$;
  habit;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private alertCtrl: AlertController, private modalCtrl: ModalController, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.query$.refetch();
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: HabitQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.habit = data && data.habit;
    })
  }

  updateActive() {
    this.apollo.mutate({
      mutation: UpdateHabitMutation,
      variables: {id: this.habit.id, isActive: !this.habit.isActive}
    }).subscribe();
  }

  updateScope() {
    if (this.habit.isControlled) {
      return
    }

    let alert = this.alertCtrl.create();
    alert.setTitle('Scope');

    Scopes.forEach((scope) => {
      alert.addInput({
        type: 'radio',
        label: scope.toString(),
        value: scope.toString(),
        checked: scope == this.habit.scope.toLowerCase()
      });
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == this.habit.scope.toLowerCase()) {
          // Scope has not changed.
          return
        }
        const scope = data;
        this.apollo.mutate({
          mutation: UpdateHabitMutation,
          variables: {id: this.habit.id, scope: scope.toUpperCase()}
        }).subscribe();
      }
    });
    alert.present();
  }

  updateDuration() {
    if (this.habit.isControlled) {
      return
    }

    let prompt = this.alertCtrl.create({
      title: 'Duration',
      message: 'Examples: 3d, 2.5 hours, 2h, 5m',
      inputs: [
        {
          name: 'duration',
          placeholder: 'Duration',
          value: this.habit.duration
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            const id = this.habit.id;
            const duration = data.duration;
            this.apollo.mutate({
              mutation: UpdateHabitMutation,
              variables: {id, duration}
            }).subscribe();
          }
        }
      ]
    });
    prompt.present();
  }

  updateContent() {
    if (this.habit.isControlled) {
      return
    }

    const content = this.habit.content;
    const title = 'Habit details';
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateHabitMutation,
          variables: {id: this.habit.id, content: data.content}
        }).subscribe();
      }
    });
    textModal.present();
  }

  delete() {
    if (this.habit.isControlled) {
      return
    }

    const id = this.habit.id;
    this.apollo.mutate({
      mutation: DeleteHabitMutation,
      variables: {id},
    }).subscribe();
    this.navCtrl.pop()
  }

  deleteTrack(track) {
    if (this.habit.isControlled) {
      return
    }

    const id = track.id;
    this.apollo.mutate({
      mutation: DeleteHabitTrackMutation,
      variables: {id},
    }).subscribe(() => this.query$.refetch());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitPage');
  }

}
