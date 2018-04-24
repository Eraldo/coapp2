import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {HabitFragment, UpdateHabitMutation} from "../habit/habit";
import {Icon} from "../../models/icon";
import {Apollo} from "apollo-angular";
import {Scopes} from "../../models/scope";

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
  mutation UpdateRoutine($id: ID!, $name: String, $scope: Scope, $content: String, $order: Int) {
    updateRoutine(input: {id: $id, name: $name, scope: $scope, content: $content, order: $order}) {
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
    alert('Coming soon. ;)');
  }

  addHabits() {
    alert('Coming soon. ;)');
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
