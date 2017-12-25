import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {MarkdownService} from "ngx-md";

const EventQuery = gql`
  query EventQuery($id: ID!) {
    event(id: $id) {
      id
      name
      start
      end
      imageUrl
      videoUrl
      location
      description
      content
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  query$;
  loading = true;
  event;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private markdownService: MarkdownService) {
    this.markdownService.setMarkedOptions({gfm: true, breaks: true});
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: EventQuery,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.event = data && data.event;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
