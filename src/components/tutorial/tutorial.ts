import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MarkdownService} from "angular2-markdown";
import gql from "graphql-tag";
import {NavController, NavParams} from "ionic-angular";
import {Apollo} from "apollo-angular";
import {DomSanitizer} from "@angular/platform-browser";

const Query = gql`
  query Query($name: String!) {
    tutorial: tutorialByName(name: $name) {
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


@Component({
  selector: 'tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialComponent {
  @Input() name: string;
  @Output() watched = new EventEmitter();
  query$;
  loading = true;
  tutorial;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService, private sanitizer: DomSanitizer) {
    console.log('Hello TutorialComponent Component');
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: Query,
      variables: {name: this.name}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tutorial = data && data.tutorial;
    });
  }

  get safeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.tutorial.videoUrl)
  }

  continue() {
    console.log('watched tutorial');
    this.watched.next();
    const name = `${this.tutorial.name.toLowerCase()} tutorial`;
    this.apollo.mutate({
      mutation: AddCheckpointMutation,
      variables: {name},
      refetchQueries: [{query: CheckpointQuery, variables: {name}}]
    })

  }

}
