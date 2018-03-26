import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const JournalEntryQuery = gql`
  query JournalEntry($id: ID!) {
    entry: journalEntry(id: $id) {
      id
      scope
      start
      keywords
      content
    }
  }
`;

@IonicPage({
  segment: "journal-entry/:id"
})
@Component({
  selector: 'page-journal-entry',
  templateUrl: 'journal-entry.html',
})
export class JournalEntryPage {
  loading = true;
  query$;
  entry;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');
    this.query$ = this.apollo.watchQuery({
      query: JournalEntryQuery,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.entry = data && data.entry;
    })
  }

  edit() {
    this.navCtrl.push('JournalEntryFormPage', {id: this.entry.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalEntryPage');
  }

}
