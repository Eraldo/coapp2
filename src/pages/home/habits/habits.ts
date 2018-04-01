import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const ViewerHero = gql`
  query {
    viewer {
      id
      hero {
        id
        routines
      }
    }
  }
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
  query$;
  loading = true;
  hero;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public modalCtrl: ModalController, public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery<any>({query: ViewerHero});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.hero = data && data.viewer && data.viewer.hero;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabitsPage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('HomeOptionsPage');
    popover.present({ev: source});
  }

}
