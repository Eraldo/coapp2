import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";
import {UserService} from "../../../services/user/user";

const QuoteFragment = gql`
  fragment QuoteFields on QuoteNode {
    id
    name
    content
    author
    liked
    disliked
  }
`;

const SuggestedActionQuery = gql`
  query {
    viewer {
      id
      experience
    }
    suggestedAction {
      type
      payload
    }
    dashboardStreak
    event: nextEvent {
      id
      name
      start
      end
      imageUrl
      videoUrl
      location
      description
      category {
        id
        order
      }
    }
    news: latestNews {
      id
      name
      date
      description
      imageUrl
      videoUrl
      category {
        id
        order
      }
    }
    quote: dailyQuote {
      ...QuoteFields
    }
  }
  ${QuoteFragment}
`;

const LikeQuoteMutation = gql`
  mutation LikeQuote($id: ID!) {
    likeQuote(input: {id: $id}) {
      quote {
        ...QuoteFields
      }
    }
  }
  ${QuoteFragment}
`;

const DislikeQuoteMutation = gql`
  mutation DislikeQuote($id: ID!) {
    dislikeQuote(input: {id: $id}) {
      quote {
        ...QuoteFields
      }
    }
  }
  ${QuoteFragment}
`;

const TriggerSuggestedActionMutation = gql`
  mutation TriggerSuggestedAction($type: Actions) {
    triggerSuggestedAction(input: {type: $type}) {
      success
    }
  }
`;

const FirstQuestCardQuery = gql`
  query {
    questCardCheckpoint: hasCheckpoint(name: "fist quest card")
  }
`;


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  icons;
  query$;
  loading = true;
  action: string;
  streak;
  event;
  quote;
  news;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, public actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, public userService: UserService) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: SuggestedActionQuery,
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data) {
        this.streak = data.dashboardStreak;
        this.action = data.suggestedAction;
        this.event = data.event;
        this.news = data.news;
        this.quote = data.quote;
      }
    })
  }

  getPayload(action) {
    if (action.payload) {
      return JSON.parse(action.payload);
    }
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  get usedFirstQuestCard() {
    return localStorage.getItem('first quest card')
  }

  useFirstQuestCard() {
    localStorage.setItem('first quest card', 'true');
  }

  startQuest(action) {
    if (!this.usedFirstQuestCard) {
      let alert = this.alertCtrl.create({
        title: 'Purposeful Action Success',
        message: 'Yeah! You just clicked your purpose full next action card. You will find more of these cards here in the future.',
        buttons: [
          {
            text: 'Got it',
            handler: () => {
              this.useFirstQuestCard();
              this.triggerAction(action);
            }
          }
        ]
      });
      alert.present();
    } else {
      this.triggerAction(action);
    }
  }

  triggerAction(action) {
    this.apollo.mutate({
      mutation: TriggerSuggestedActionMutation,
      variables: {
        type: action.type
      }
    }).subscribe();
    switch (action.type) {
      case 'STARTING_JOURNEY': {
        this.navCtrl.push('QuestPage');
        break
      }
    }
  }

  nextStep() {
    this.navCtrl.push('AgendaPage');
  }

  likeQuote() {
    this.apollo.mutate({
      mutation: LikeQuoteMutation,
      variables: {id: this.quote.id},
    }).subscribe();
  }

  dislikeQuote() {
    this.apollo.mutate({
      mutation: DislikeQuoteMutation,
      variables: {id: this.quote.id},
    }).subscribe();
  }

  feedbackQuote() {
    if (this.quote.liked || this.quote.disliked) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Quote Reaction',
        buttons: [
          {
            text: 'Like',
            icon: this.icons.LIKE,
            cssClass: 'bg-success',
            handler: () => this.likeQuote()
          }, {
            text: 'Dislike',
            icon: this.icons.DISLIKE,
            handler: () => this.dislikeQuote()
          }, {
            text: 'Cancel',
            role: 'cancel',
            icon: this.icons.CANCEL,
          }
        ]
      });
      actionSheet.present();
    }
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('HomeOptionsPage');
    popover.present({ev: source});
  }
}
