import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {OutcomeService} from "../../services/outcome/outcome";
import {CreateTensionMutation} from "../../pages/journey/demon/demon";

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

  constructor(public app: App, public viewCtrl: ViewController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public outcomeService: OutcomeService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickaddOptionsPage');
  }

  get navCtrl(): NavController {
    return this.app.getActiveNavs()[0];
  }

  addOutcome() {
    this.outcomeService.createOutcome();
    this.viewCtrl.dismiss();
    // this.navCtrl.push('OutcomeFormPage');
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
              }).subscribe();
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

  addTension(name = '') {
    let prompt = this.alertCtrl.create({
      title: 'Tension',
      inputs: [
        {
          name: 'tension',
          placeholder: 'My tension...',
          value: name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const name = data.tension;
            if (name && name.length >= 4) {
              this.apollo.mutate({
                mutation: CreateTensionMutation,
                variables: {
                  name: name,
                  content: ''
                }
              }).subscribe();
            } else {
              // TODO: Show error message: "Note has to be at least 4 characters long."
              this.addTension(name)
            }
          }
        }
      ]
    });
    prompt.present();
    this.viewCtrl.dismiss();
  }
}
