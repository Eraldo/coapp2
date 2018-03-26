import {Component, Input} from '@angular/core';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {AlertController, ModalController} from "ionic-angular";

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

const UpdateJournalEntryMutation = gql`
  mutation UpdateJournalEntry($id: ID!, $keywords: String, $content: String) {
    updateJournalEntry(input: {id: $id, keywords: $keywords, content: $content}) {
      journalEntry {
        id
        scope
        start
        keywords
        content
      }
    }
  }
`;

@Component({
  selector: 'journal-entry',
  templateUrl: 'journal-entry.html'
})
export class JournalEntryComponent {
  @Input() id;
  loading = true;
  query$;
  entry;

  constructor(private apollo: Apollo, public alertCtrl: AlertController, private modalCtrl: ModalController) {
    console.log('Hello JournalEntryComponent Component');
  }

  ngOnChanges() {
    const id = this.id;
    this.query$ = this.apollo.watchQuery({
      query: JournalEntryQuery,
      variables: {id}
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.entry = data && data.entry;
    })
  }

  updateKeywords() {
    let prompt = this.alertCtrl.create({
      title: 'Keywords',
      inputs: [
        {
          name: 'keywords',
          placeholder: 'Keywords',
          value: this.entry.keywords
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const keywords = data.keywords;
            if (keywords != this.entry.keywords) {
              this.apollo.mutate({
                mutation: UpdateJournalEntryMutation,
                variables: {id: this.entry.id, keywords}
              }).subscribe();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  updateContent() {
    const content = this.entry.content;
    const title = 'Journal Entry content';
    let textModal = this.modalCtrl.create('TextModalPage', {content, title}, {enableBackdropDismiss: false});
    textModal.onDidDismiss(data => {
      if (data && data.content != content) {
        this.apollo.mutate({
          mutation: UpdateJournalEntryMutation,
          variables: {id: this.entry.id, content: data.content}
        }).subscribe();
      }
    });
    textModal.present();
  }

}
