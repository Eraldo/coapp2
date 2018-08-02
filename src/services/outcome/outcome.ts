import {Injectable} from '@angular/core';
import {AlertController, App, NavController, ToastController} from "ionic-angular";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

export const OutcomeFragment = gql`
  fragment Outcome on OutcomeNode {
    id
    name
    description
    status
    scope
    inbox
    start: date
    deadline
    steps {
      edges {
        node {
          id
          name
          order
          completedAt
        }
      }
    }
    tags {
      edges {
        node {
          id
          name
        }
      }
    }
    relatedOutcomes {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const CreateOutcomeMutation = gql`
  mutation CreateOutcome($name: String!, $inbox: Boolean) {
    createOutcome(input: {name: $name, inbox: $inbox}) {
      outcome {
        ...Outcome
      }
    }
  }
  ${OutcomeFragment}
`;

@Injectable()
export class OutcomeService {

  constructor(public app: App, private apollo: Apollo, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    console.log('Hello OutcomeService Service');
  }

  get navCtrl(): NavController {
    return this.app.getActiveNavs()[0];
  }

  createOutcome(name = '', inbox = false) {
    let prompt = this.alertCtrl.create({
      title: 'Outcome',
      inputs: [
        {
          name: 'name',
          placeholder: 'My outcome...',
          value: name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: data => {
            const name = data.name;
            if (name && name.length >= 4) {
              this.apollo.mutate({
                mutation: CreateOutcomeMutation,
                variables: {
                  name,
                  inbox
                }
              }).subscribe(({data}) => this.navCtrl.push("OutcomePage", {id: data.createOutcome.outcome.id}));
            } else {
              console.log("Name has to be at least 4 characters long.");
              // Show error message.
              let toast = this.toastCtrl.create({
                message: 'Name has to be at least 4 characters long.',
                duration: 3000
              });
              toast.present();
              this.createOutcome(name)
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
