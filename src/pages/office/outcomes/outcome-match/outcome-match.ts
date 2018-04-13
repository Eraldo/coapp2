import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

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
  matches = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private hotkeysService: HotkeysService, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: OutcomeMatchQuery,
      // variables: {id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.outcome1 = data && data.outcomes[0];
      this.outcome2 = data && data.outcomes[1];
    });
  }

  ionViewDidEnter() {
    // Keyboard shortcuts.
    this.hotkeysService.add(new Hotkey('1', (event: KeyboardEvent): boolean => {
      this.select(this.outcome1.id);
      return false; // Prevent bubbling
    }, [], 'Choose #1'));
    this.hotkeysService.add(new Hotkey('2', (event: KeyboardEvent): boolean => {
      this.select(this.outcome2.id);
      return false; // Prevent bubbling
    }, [], 'Choose #2'));
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
    this.matches += 1;
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

  ionViewDidLeave() {
    for (const combo of ['1', '2']) {
      const shortcut = this.hotkeysService.get(combo);
      if (shortcut) {
        this.hotkeysService.remove(shortcut);
      }
    }
  }

}
