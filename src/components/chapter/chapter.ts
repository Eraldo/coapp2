import {Component, Input} from '@angular/core';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {NavController} from "ionic-angular";
import {MarkdownService} from "angular2-markdown";

const Query = gql`
  query Query($id: ID!) {
    chapter(id: $id) {
      id
      name
      content
      created
    }
  }
`;

@Component({
  selector: 'chapter',
  templateUrl: 'chapter.html'
})
export class ChapterComponent {
  @Input() id: string;
  query$;
  loading = true;
  chapter;

  constructor(public navCtrl: NavController, private apollo: Apollo, private markdownService: MarkdownService) {
    console.log('Hello ChapterComponent Component');
    // Workaround: https://github.com/dimpu/angular2-markdown/issues/65
    // this.markdownService.setMarkedOptions({gfm: true, breaks: true, sanitize: true});
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: Query,
      variables: {id: this.id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.chapter = data && data.chapter;
    })
  }

  edit() {
    this.navCtrl.push('ChapterFormPage', {id: this.chapter.id})
  }
}
