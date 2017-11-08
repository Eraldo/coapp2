import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const Query = gql`
  query Query($name: String!) {
    completed: hasCheckpoint(name: $name)
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    this.name = this.navParams.get('name');
    this.query$ = this.apollo.watchQuery({
      query: Query,
      variables: {name: `${this.name.toLowerCase()} tutorial`}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.completed = data && data.completed;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
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
