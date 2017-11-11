import {Component, Input} from '@angular/core';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

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

  constructor(private apollo: Apollo) {
    console.log('Hello ChapterComponent Component');
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
}
