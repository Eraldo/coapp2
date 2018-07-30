import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";
import {AddCheckpointMutation} from "../../project/support/tutorials/tutorial/tutorial";

export const CurrentQuestStatusQuery = gql`
  query CurrentQuestStatus {
    status: currentQuestStatus {
      id
      quest {
        id
        name
        order
        videoUrl
        content
        objectives {
          edges {
            node {
              id
              name
              code
              content
            }
          }
        }
      }
      completedObjectives {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-quest',
  templateUrl: 'quest.html',
})
export class QuestPage {
  icons;
  loading = true;
  query$;
  quest;
  completed;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, public toastCtrl: ToastController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: CurrentQuestStatusQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.quest = data && data.status && data.status.quest;
      this.completed = data && data.status && data.status.completedObjectives.edges.map(edge => edge.node.id);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestPage');
  }

  refresh() {
    this.query$.refetch();
  }

  ionViewDidEnter() {
    this.refresh();
  }

  openQuest() {
    this.navCtrl.push('ProloguePage')
  }

  tutorialInfo() {
    this.navCtrl.push('TutorialsPage');
  }

  journeyInfo() {
    this.navCtrl.push('MentorPage');
  }

  communityInfo() {
    this.navCtrl.push('TribePage');
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('JourneyOptionsPage');
    popover.present({ev: source});
  }

  objectiveAction(objective) {
    switch (objective.code) {
      case 'guidelines_accept': {
        this.navCtrl.push('GuidelinesPage');
        return;
      }
      case 'chat_join': {
        this.apollo.mutate({
          mutation: AddCheckpointMutation,
          variables: {
            name: `chat tutorial`
          }
        }).subscribe();
        window.open('http://chat.coLegend.org/', '_blank');
        return;
      }
      case 'tutorials_watch': {
        this.navCtrl.push('TutorialsPage');
        return;
      }
      case 'mentor_talk': {
        this.navCtrl.push('MentorPage');
        return;
      }
    }
  }
}
