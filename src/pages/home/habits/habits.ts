import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {HabitFragment, UpdateHabitMutation} from "../../habit/habit";
import {Icon} from "../../../models/icon";

export const RoutineFragment = gql`
  fragment RoutineFields on RoutineNode {
    id
    name
    scope
    content
    order
  }
`;

const HabitsQuery = gql`
  query {
    viewer {
      id
      hero {
        id
        routines
      }
      habits {
        edges {
          node {
            ...HabitFields
          }
        }
      }
      routines {
        edges {
          node {
            ...RoutineFields
          }
        }
      }
    }
  }
  ${HabitFragment}
  ${RoutineFragment}
`;

const CreateHabitMutation = gql`
  mutation CreateHabit($name: String) {
    createHabit(input: {name: $name}) {
      habit {
        ...HabitFields
      }
    }
  }
  ${HabitFragment}
`;

const UpdateHeroRoutinesMutation = gql`
  mutation updateHero($routines: String) {
    updateHero(input: {routines: $routines}) {
      hero {
        id
        routines
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-habits',
  templateUrl: 'habits.html',
})
export class HabitsPage {
  icons;
  query$;
  loading = true;
  hero;
  habits;
  routines;
  reorder = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<any>({query: HabitsQuery});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && data.viewer) {
        this.hero = data.viewer.hero;
        this.habits = data.viewer.habits;
        this.routines = data.viewer.routines;
      }
    });
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  update() {
    const title = 'Routines';
    const content = this.hero.routines;
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      const routines = data && data.content;
      if (routines != content) {
        this.apollo.mutate({
          mutation: UpdateHeroRoutinesMutation,
          variables: {
            routines
          }
        }).subscribe();
      }
    });
    textModal.present();
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          // value: ''
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
            const name = data.name;
            this.apollo.mutate({
              mutation: CreateHabitMutation,
              variables: {name},
              refetchQueries: [{query: HabitsQuery}]
            }).subscribe();
          }
        }
      ]
    });
    prompt.present();
  }

  reorderHabits(indexes) {
    const from = this.habits.edges[indexes.from].node;
    const to = this.habits.edges[indexes.to].node;

    this.apollo.mutate({
      mutation: UpdateHabitMutation,
      variables: {id: from.id, order: to.order},
      refetchQueries: [{query: HabitsQuery}]
    }).subscribe();
  }


  toggleReorder() {
    this.reorder = !this.reorder;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitsPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('HomeOptionsPage');
    popover.present({ev: source});
  }

}
