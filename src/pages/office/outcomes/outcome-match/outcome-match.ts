import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const OutcomeMatchQuery = gql`
  query OutcomeMatchQuery {
    outcomes: outcomeMatch {
      id
      name
      score
      comparisons
    }
  }
`;

const MatchOutcomesMutation = gql`
  mutation MatchOutcomes($contestant: ID!, $competitor: ID!, $success: Boolean!) {
    matchOutcomes(input: {
      contestant: $contestant,
      competitor: $competitor,
      success: $success
    }) {
      success
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-outcome-match',
  templateUrl: 'outcome-match.html',
})
export class OutcomeMatchPage {
  loading = true;
  query$;
  outcome1;
  outcome2;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: OutcomeMatchQuery,
      // variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.outcome1 = data && data.outcomes[0];
      this.outcome2 = data && data.outcomes[1];
    })
  }

  select(id: string) {
    this.apollo.mutate({
      mutation: MatchOutcomesMutation,
      variables: {
        contestant: this.outcome1.id,
        competitor: this.outcome2.id,
        success: id == this.outcome1.id
      },
    }).subscribe();
    let toast = this.toastCtrl.create({
      message: `${this.outcome1.name} is ${id == this.outcome1.id ? 'more' : 'less'} important than ${this.outcome2.name}`,
      duration: 2000
    });
    toast.present();
    this.query$.refetch();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutcomeMatchPage');
  }

}
