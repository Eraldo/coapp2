import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {HabitFragment, TrackHabitMutation, UpdateHabitMutation} from "../habit/habit";
import {Icon} from "../../../../models/icon";
import {Apollo} from "apollo-angular";
import {Scopes} from "../../../../models/scope";

export const RoutineFragment = gql`
  fragment RoutineFields on RoutineNode {
    id
    name
    scope
    content
    order
  }
`;

const RoutineQuery = gql`
  query RoutineQuery($id: ID!) {
    routine(id: $id) {
      ...RoutineFields
      routineHabits {
        edges {
          node {
            id
            order
            habit {
              ...HabitFields
            }
          }
        }
      }
    }
  }
  ${RoutineFragment}
  ${HabitFragment}
`;

export const UpdateRoutineMutation = gql`
  mutation UpdateRoutine($id: ID!, $name: String, $scope: Scope, $content: String, $order: Int, $habits: [String]) {
    updateRoutine(input: {id: $id, name: $name, scope: $scope, content: $content, order: $order, habits: $habits}) {
      routine {
        ...RoutineFields
      }
    }
  }
  ${RoutineFragment}
`;

const DeleteRoutineMutation = gql`
  mutation DeleteRoutine($id: ID!) {
    deleteRoutine(input: {id: $id}) {
      success
    }
  }
`;

export const UpdateRoutineHabitMutation = gql`
  mutation UpdateRoutineHabit($id: ID!, $order: Int) {
    updateRoutineHabit(input: {id: $id, order: $order}) {
      success
    }
  }
`;

@IonicPage({
  segment: 'routine/:id'
})
@Component({
  selector: 'page-routine',
  templateUrl: 'routine.html',
})
export class RoutinePage {
  icons;
  loading = true;
  query$;
  routine;
  reorder = false;

  get routineHabits() {
    return this.routine.routineHabits.edges.map(edge => edge.node);
  }

  get habits() {
    return this.routineHabits.map(routineHabit => routineHabit.habit);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private alertCtrl: AlertController, private modalCtrl: ModalController, public popoverCtrl: PopoverController) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: RoutineQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.routine = data && data.routine;
    })
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.routine.name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const id = this.routine.id;
            const name = data.name;
            this.apollo.mutate({
              mutation: UpdateRoutineMutation,
              variables: {id, name}
            }).subscribe();
          }
        }
      ]
    });
    prompt.present();
  }

  updateScope() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Scope');

    Scopes.forEach((scope) => {
      alert.addInput({
        type: 'radio',
        label: scope.toString(),
        value: scope.toString(),
        checked: scope == this.routine.scope.toLowerCase()
      });
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == this.routine.scope.toLowerCase()) {
          // Scope has not changed.
          return
        }
        const scope = data;
        this.apollo.mutate({
          mutation: UpdateRoutineMutation,
          variables: {id: this.routine.id, scope: scope.toUpperCase()}
        }).subscribe();
      }
    });
    alert.present();
  }

  updateContent() {
    const content = this.routine.content;
    const title = 'Routine details';
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateRoutineMutation,
          variables: {id: this.routine.id, content: data.content}
        }).subscribe();
      }
    });
    textModal.present();
  }

  toggleReorder() {
    this.reorder = !this.reorder;
  }

  reorderHabits(indexes) {
    const from = this.routineHabits[indexes.from];
    const to = this.routineHabits[indexes.to];

    this.apollo.mutate({
      mutation: UpdateRoutineHabitMutation,
      variables: {id: from.id, order: to.order},
    }).subscribe(() => this.query$.refetch());
  }

  addHabits() {
    // alert('Coming soon. ;)');
    const currentIds = this.habits.map(habit => habit.id);
    let habitsSelectModal = this.modalCtrl.create('HabitsSelectPage', {selected: currentIds.slice()});
    habitsSelectModal.onDidDismiss(ids => this.setHabits(ids));
    habitsSelectModal.present();
  }

  private setHabits(ids: string[]) {
    // console.log(ids);
    const currentIds = this.habits.map(habit => habit.id);
    // Habits changed: Change routine habits.
    if (ids && JSON.stringify(ids.sort()) != JSON.stringify(currentIds.sort())) {
      this.apollo.mutate({
        mutation: UpdateRoutineMutation,
        variables: {id: this.routine.id, habits: ids},
      }).subscribe(() => this.query$.refetch());
    }
  }

  trackHabit(habit, index) {
    if (index == 0) {
      const id = habit.id;
      this.apollo.mutate({
        mutation: TrackHabitMutation,
        variables: {id},
      }).subscribe(() => this.query$.refetch());
    }
  }

  delete() {
    const id = this.routine.id;
    this.apollo.mutate({
      mutation: DeleteRoutineMutation,
      variables: {id},
    }).subscribe();
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutinePage');
  }

}
