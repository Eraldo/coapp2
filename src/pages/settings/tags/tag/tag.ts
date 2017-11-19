import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "angular2-markdown";

const Query = gql`
  query Query($id: ID!) {
    tag(id: $id) {
      id
      name
      description
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-tag',
  templateUrl: 'tag.html',
})
export class TagPage {
  loading = true;
  query$;
  tag;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: Query,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.tag = data && data.tag;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagPage');
  }

}
