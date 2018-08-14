import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";
import {AddCheckpointMutation} from "../../project/support/tutorials/tutorial/tutorial";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

export const CurrentQuestStatusQuery = gql`
  query CurrentQuestStatus($id: ID) {
    status: currentQuestStatus(id: $id) {
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
      previous {
        id
      }
      next {
        id
      }
    }
  }
`;

@IonicPage({
  segment: 'quest'
})
@Component({
  selector: 'page-quest',
  templateUrl: 'quest.html',
})
export class QuestPage {
  icons;
  loading = true;
  query$;
  status;
  quest;
  completed;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
      this.query$ = this.apollo.watchQuery({
        query: CurrentQuestStatusQuery,
        variables: {id}
      });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.status = data && data.status;
      this.quest = this.status && data.status.quest;
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

  previous() {
    this.query$.refetch({id: this.status.previous.id});
  }

  next() {
    this.query$.refetch({id: this.status.next.id});
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
          this.navCtrl.push('TutorialPage', {name: 'Quest'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
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
      case 'intro_watch': {
        this.navCtrl.push('TutorialPage', {name: 'coLegend'});
        return;
      }
      case 'mentor_talk': {
        this.navCtrl.push('MentorPage');
        return;
      }
    }
  }
}
