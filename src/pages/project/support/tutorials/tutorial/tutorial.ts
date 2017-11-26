import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";
import {DomSanitizer} from "@angular/platform-browser";

const Query = gql`
  query Query($tutorialName: String!, $checkpointName: String!) {
    completed: hasCheckpoint(name: $checkpointName)
    tutorial: tutorialByName(name: $tutorialName) {
      id
      name
      videoUrl
      content
    }
  }
`;

const AddCheckpointMutation = gql`
  mutation AddCheckpoint($name: String!) {
    addCheckpoint(input: {name: $name}) {
      checkpoint {
        id
      }
    }
  }
`;

const CheckpointQuery = gql`
  query Checkpoint($name: String!) {
    hasTutorial: hasCheckpoint(name: $name)
  }
`;


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  name;
  query$;
  loading = true;
  completed = false;
  tutorial;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService, private sanitizer: DomSanitizer) {
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    this.name = this.navParams.get('name');
    this.query$ = this.apollo.watchQuery({
      query: Query,
      variables: {
        tutorialName: `${this.name.toLowerCase()}`,
        checkpointName: `${this.name.toLowerCase()} tutorial`,
      }
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data) {
        this.completed = data && data.completed;
        this.tutorial = data && data.tutorial;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  get safeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.tutorial.videoUrl)
  }

  continue() {
    const name = `${this.name.toLowerCase()} tutorial`;
    this.apollo.mutate({
      mutation: AddCheckpointMutation,
      variables: {name},
      refetchQueries: [{query: CheckpointQuery, variables: {name}}]
    });
    this.navCtrl.pop()
  }

}