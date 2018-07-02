import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Icon} from "../../../../models/icon";
import moment from "moment";

const EventQuery = gql`
  query EventQuery($id: ID!) {
    viewer {
      id
    }
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
      participants {
        edges {
          node {
            id
            avatar
          }
        }
      }
    }
  }
`;

const JoinEventMutation = gql`
  mutation JoinEvent($id: ID!) {
    joinEvent(input: {id: $id}) {
      event {
        id
        participants {
          edges {
            node {
              id
              avatar
            }
          }
        }
      }
    }
  }
`;

@IonicPage({
  segment: 'event/:id'
})
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  icons;
  query$;
  loading = true;
  event;
  viewer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    this.icons = Icon;
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: EventQuery,
      variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.event = data && data.event;
      this.viewer = data && data.viewer;
    })
  }

  get canJoin() {
    // Checking if the event exists, has not yet started and the viewer is not already a participant.
    const eventExists = this.event;
    const eventUpcoming = eventExists && moment().isBefore(moment(this.event.start));
    const eventNotJoined = eventExists && !this.event.participants.edges.some(edge => edge.node && edge.node.id == this.viewer.id);
    return eventExists && eventUpcoming && eventNotJoined
  }

  join() {
    const id = this.event.id;
    this.apollo.mutate({
      mutation: JoinEventMutation,
      variables: {id},
    }).subscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
