import {Component, Input} from '@angular/core';
import gql from "graphql-tag";
import {NavController, NavParams} from "ionic-angular";
import {Apollo} from "apollo-angular";

const JournalEntryItemQuery = gql`
  query JournalEntryItem($id: ID!) {
    entry: journalEntry(id: $id) {
      id
      scope
      start
      keywords
    }
  }
`;

@Component({
  selector: 'journal-entry-item',
  templateUrl: 'journal-entry-item.html'
})
export class JournalEntryItemComponent {
  @Input() id;
  loading = true;
  query$;
  entry;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo) {
    console.log('Hello JournalEntryItemComponent Component');
  }

  ngOnInit() {
    this.query$ = this.apollo.watchQuery({
      query: JournalEntryItemQuery,
      variables: {id: this.id}
    });
    this.query$.valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.entry = data && data.entry;
    })
  }

  open() {
    if (this.entry.id) {
      this.navCtrl.push('JournalEntryPage', {id: this.entry.id});
    } else {
      this.navCtrl.push('JournalEntryFormPage', {scope: this.entry.scope, date: this.entry.start});
    }
  }
}
