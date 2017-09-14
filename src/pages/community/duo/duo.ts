import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {UserService} from "../../../services/user/user";
import {Observable} from "rxjs/Observable";
import {User} from "../../../models/user";
import {DuoService} from "../../../services/duo/duo";
import {EmailService} from "../../../services/email/email";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const UserDuoQuery = gql`
  query {
    myUser {
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

interface QueryResponse {
  myUser: {
    duo: Duo
  }
}

interface Duo {
  name
  members: {
    edges: {
      id
      name
    }[]
  }
}

@IonicPage()
@Component({
  selector: 'page-duo',
  templateUrl: 'duo.html',
})
export class DuoPage implements OnInit {
  duo$: Observable<Duo>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {
  }

  ngOnInit(): void {
    const query = this.apollo.watchQuery<QueryResponse>({query: UserDuoQuery});
    this.duo$ = query.map(({data}) => data.myUser.duo)
  }

  ionViewDidEnter() {
    // this.duo$.first().subscribe(duo => {
    //     if (!duo) {
    //       this.navCtrl.push('DuosPage')
    //     }
    //   }
    // )
  }

  contact() {
    let prompt = this.alertCtrl.create({
      title: 'Message',
      inputs: [
        {
          name: 'message',
          placeholder: 'My message...',
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
          text: 'Send',
          handler: data => {
            const message = data.message;

            // // TODO: Refactoring!! Hackery code smell.
            // Observable.combineLatest(this.user$, (this.partner$), (user, partner) => {
            //   const subject = `New message from ${user.name}`;
            //   return this.emailService.send$(partner.email, subject, message)
            // })
            // // Flatten
            //   .switchMap(message$ => message$)
            //   .subscribe()
          }
        }
      ]
    });
    prompt.present();
  }

  create() {
    let prompt = this.alertCtrl.create({
      title: 'Create a Duo',
      inputs: [
        {
          name: 'name',
          placeholder: 'Duo name...',
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
            const name = data.name;

            // this.user$
            //   .subscribe(user => {
            //       const members = [user.id];
            //       return this.duoService.addDuo(name, members)
            //     }
            //   );
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(source) {
    let popover = this.popoverCtrl.create('DuoOptionsPage');
    popover.present({ev: source});
    popover.onDidDismiss(() => this.ionViewDidEnter())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuoPage');
  }

}
