import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";

const Query = gql`
  query {
    viewer {
      story {
        id
        chapters(first: 1) {
          edges {
            node {
              id
              name
              content
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: Query});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      console.log(data);
      this.chapters = data && data.viewer && data.viewer.story && data.viewer.story.chapters;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryPage');
  }

}
