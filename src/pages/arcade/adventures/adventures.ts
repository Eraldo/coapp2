import {Component} from '@angular/core';
import {
  IonicPage, MenuController, ModalController, NavController, NavParams, PopoverController,
  ToastController
} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import gql from "graphql-tag";
import {Icon} from "../../../models/icon";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

export const AdventuresQuery = gql`
  query Adventures($completed: Boolean, $search: String, $cursor: String) {
    adventures(public: true, completed: $completed, search: $search, first: 20, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          scope
          imageUrl
          rating
          completed
        }
      }
    }
  }
`;

const SendFeedbackMutation = gql`
  mutation SendFeedback($subject: String!, $message: String!) {
    sendFeedback(input: {subject: $subject, message: $message}) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-adventures',
  templateUrl: 'adventures.html',
})
export class AdventuresPage {
  icons;
  loading = true;
  query$;
  adventures;
  segment = "challenges";
  completed$ = new BehaviorSubject<boolean>(false);
  search$ = new BehaviorSubject<string>(undefined);
  hasNextPage = false;
  cursor;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    private modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public optionsMenuService: OptionsMenuService,
  ) {
    this.icons = Icon;
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: AdventuresQuery,
      variables: {
        completed: this.completed$.value,
        search: this.search$.value
      }
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.adventures = data && data.adventures;
      // Pagination
      this.cursor = data.adventures.pageInfo.endCursor;
      setTimeout(() => {
        this.hasNextPage = data.adventures.pageInfo.hasNextPage;
      }, this.hasNextPage ? 0 : 1000)
    });
    this.completed$.subscribe(completed => this.query$.refetch({completed}));
    this.search$.subscribe(search => this.query$.refetch({search}));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdventuresPage');
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.query$.refetch();
  }

  showFilters() {
    this.menuCtrl.open('adventures-filter-menu');
  }

  hideFilters() {
    this.menuCtrl.close('adventures-filter-menu');
  }

  showSegment(segment) {
    switch (segment) {
      case 'challenges': {
        this.completed$.next(false);
        return;
      }
      case 'completed': {
        this.completed$.next(true);
        return;
      }
    }
    this.refresh();
  }

  search(query) {
    this.search$.next(query);
  }

  loadMore() {
    this.hasNextPage = false;
    this.query$.fetchMore({
      variables: {cursor: this.cursor},
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          ...previousResult,
          adventures: {
            ...fetchMoreResult.adventures,
            edges: [
              ...previousResult.adventures.edges,
              ...fetchMoreResult.adventures.edges,
            ]
          }
        };
      },
    });
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
          this.navCtrl.push('TutorialPage', {name: 'Adventures'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }

  create() {
    const subject = 'Adventure suggestion/feedback';
    const message = 'Here you can suggest a new adventure and/or give feedback to our "adventures" in general.';
    let textModal = this.modalCtrl.create('TextModalPage', {
      title: subject,
      content: message
    }, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != message) {
        this.apollo.mutate({
          mutation: SendFeedbackMutation,
          variables: {
            subject: subject,
            message: data.content
          }
        }).subscribe(() => {
          let toast = this.toastCtrl.create({
            message: 'Thank you for your feedback! :D',
            duration: 3000
          });
          toast.present();
        });
      }
    });
    textModal.present();
  }
}
