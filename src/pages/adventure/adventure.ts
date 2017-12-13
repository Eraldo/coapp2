import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import gql from "graphql-tag";
import {MarkdownService} from "angular2-markdown";
import {Apollo} from "apollo-angular";

const AdventureQuery = gql`
  query Adventure($id: ID!) {
    adventure(id: $id) {
      id
      name
      scope
      imageUrl
      content
      rating
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-adventure',
  templateUrl: 'adventure.html',
})
export class AdventurePage {
  query$;
  loading = true;
  adventure;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: AdventureQuery,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.adventure = data && data.adventure;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdventurePage');
  }

}
