import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {OptionsMenuService} from "../../../services/options-menu/options-menu";

const Query = gql`
  query {
    viewer {
      id
      story {
        id
        chapters(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
})
export class StoryPage {
  query$;
  loading = true;
  chapters;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    public popoverCtrl: PopoverController,
    public optionsMenuService: OptionsMenuService,
  ) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.chapters = data && data.viewer && data.viewer.story && data.viewer.story.chapters;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryPage');
  }

  refresh() {
    this.query$.refetch();
  }

  ionViewDidEnter() {
    this.refresh();
  }

  addChapter() {
    this.navCtrl.push('ChapterFormPage')
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
          this.navCtrl.push('TutorialPage', {name: 'Story'})
        }
      },
    ];
    this.optionsMenuService.showOptions(options, event);
  }
}
