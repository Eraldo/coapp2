import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UserDuoQuery = gql`
  query {
    viewer {
      id
      duo {
        id
        name
        members {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const UpdateDuoMutation = gql`
  mutation UpdateTag($id: ID!, $name: String, $notes: String) {
    updateDuo(input: {id: $id, name: $name, notes: $notes}) {
      duo {
        id
        name
        notes
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-duo',
  templateUrl: 'duo.html',
})
export class DuoPage implements OnInit {
  query$;
  loading = true;
  duo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<any>({query: UserDuoQuery});
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      this.duo = data.viewer.duo;
    });
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    // this.loading = true;
    this.query$.refetch().then(({loading}) => this.loading = loading);
  }

  chooseDuo() {
    this.navCtrl.push('DuosPage');
  }

  updateName() {
    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: this.duo.name
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
            const name = data.name;
            if (name != this.duo.name) {
              this.apollo.mutate({
                mutation: UpdateDuoMutation,
                variables: {
                  id: this.duo.id,
                  name: name
                }
              }).subscribe();
            } else {
              // TODO: Show error message: "Name has to be at least 4 characters long."
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('DuoOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.refresh())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoPage');
  }

}
