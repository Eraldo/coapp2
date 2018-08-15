import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {HabitFragment, UpdateHabitMutation} from "./habit/habit";
import {Icon} from "../../../models/icon";
import {RoutineFragment, UpdateRoutineMutation} from "./routine/routine";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Scope, Scopes} from "../../../models/scope";
import {ScopeService} from "../../../services/scope/scope";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const HabitsQuery = gql`
  query Habits($scope: String!) {
    viewer {
      id
      hero {
        id
        routines
      }
      habits(scope: $scope) {
        edges {
          node {
            ...HabitFields
          }
        }
      }
      routines(scope: $scope) {
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
  mutation CreateHabit($name: String, $scope: Scope) {
    createHabit(input: {name: $name, scope: $scope}) {
      habit {
        ...HabitFields
      }
    }
  }
  ${HabitFragment}
`;

const CreateRoutineMutation = gql`
  mutation CreateRoutine($name: String, $scope: Scope) {
    createRoutine(input: {name: $name, scope: $scope}) {
      routine {
        ...RoutineFields
      }
    }
  }
  ${RoutineFragment}
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
  loading = true;
  query$;
  scope$ = new BehaviorSubject<Scope>(Scope.DAY);
  scopes: Scope[] = Scopes;
  hero;
  habits;
  routines;
  reorder = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    private scopeService: ScopeService,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  get scope() {
    return this.scope$.value;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<any>({
      query: HabitsQuery,
      variables: {
        scope: this.scope
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data && data.viewer) {
        this.hero = data.viewer.hero;
        this.habits = data.viewer.habits;
        this.routines = data.viewer.routines;
      }
    });
    this.scope$.subscribe(scope => this.query$.refetch({scope: this.scope}));
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  refresh() {
    this.query$.refetch();
  }

  selectScope() {
    this.scopeService.selectScope(this.scope).then(scope => this.scope$.next(scope), console.log);
  }

  setScope(scope: Scope) {
    this.scope$.next(scope);
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

  createHabit() {
    let prompt = this.alertCtrl.create({
      title: 'Habit name',
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
              variables: {name, scope: this.scope.toUpperCase()},
            }).subscribe(() => this.query$.refetch());
          }
        }
      ]
    });
    prompt.present();
  }

  createRoutine() {
    let prompt = this.alertCtrl.create({
      title: 'Routine name',
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
              mutation: CreateRoutineMutation,
              variables: {name, scope: this.scope.toUpperCase()},
            }).subscribe(() => this.query$.refetch());
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
    }).subscribe(() => this.query$.refetch());
  }

  reorderRoutines(indexes) {
    const from = this.routines.edges[indexes.from].node;
    const to = this.routines.edges[indexes.to].node;

    this.apollo.mutate({
      mutation: UpdateRoutineMutation,
      variables: {id: from.id, order: to.order},
    }).subscribe(() => this.query$.refetch());
  }

  toggleReorder() {
    this.reorder = !this.reorder;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitsPage');
  }

  showOptions(event) {
    let options = [
      {
        text: 'Refresh',
        handler: () => {
          this.refresh();
        }
      },
      {
        text: 'Show tutorial',
        handler: () => {
          this.navCtrl.push('TutorialPage', {name: 'Habits'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
