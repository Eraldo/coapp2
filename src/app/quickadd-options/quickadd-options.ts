import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../../../services/user/user";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

const AddJournalEntryNoteMutation = gql`
  mutation AddJournalEntryNote($content: String!) {
    addJournalEntryNote(input: {content: $content}) {
      journalEntry {
        id
        scope
        start
        content
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-quickadd-options',
  templateUrl: 'quickadd-options.html',
})
export class QuickaddOptionsPage {

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickaddOptionsPage');
  }

  get navCtrl(): NavController {
    return this.app.getActiveNavs()[0];
  }

  addOutcome() {
    this.navCtrl.push('OutcomeFormPage');
    this.viewCtrl.dismiss();
  }

  addJournalNote() {
    let prompt = this.alertCtrl.create({
      title: 'Note',
      inputs: [
        {
          name: 'note',
          placeholder: 'My note...',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const note = data.note;
            if (note && note.length >= 4) {
              this.apollo.mutate({
                mutation: AddJournalEntryNoteMutation,
                variables: {
                  content: note
                }
              });
            } else {
              // TODO: Show error message: "Note has to be at least 4 characters long."
            }
          }
        }
      ]
    });
    prompt.present();
    this.viewCtrl.dismiss();
  }
}
