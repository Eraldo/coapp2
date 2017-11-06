import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const EventsQuery = gql`
  query {
    events(first: 10) {
      edges {
        node {
          id
          name
          start
          end
          imageUrl
          location
          description
        }
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  query$;
  loading = true;
  events;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({query: EventsQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.events = data && data.events;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}
