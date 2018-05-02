import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../models/icon";

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
    suggestedAction
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
    }
    news: latestNews {
      id
      name
      date
      description
      imageUrl
      videoUrl
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController, public actionSheetCtrl: ActionSheetController) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: SuggestedActionQuery});
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

  ionViewDidEnter() {
    this.query$.refetch()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
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
