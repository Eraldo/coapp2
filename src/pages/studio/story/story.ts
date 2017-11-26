import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query {
    viewer {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.chapters = data && data.viewer && data.viewer.story && data.viewer.story.chapters;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryPage');
  }

  ionViewDidEnter() {
    this.query$.refetch()
  }

  addChapter() {
    this.navCtrl.push('ChapterFormPage')
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('StudioOptionsPage');
    popover.present({ev: source});
  }
}
