import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController, ToastController} from "ionic-angular";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {environment} from "../../../environments/environment";
import {DateService} from '../../../services/date/date';

const UserQuery = gql`
  query me {
    viewer {
      id
      name
      outcomes {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

const LoginMutation = gql`
  mutation login($email: String, $password: String!) {
    login(input: {email: $email, password: $password}) {
      token
      user {
        id
        name
      }
    }
  }
`;

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage implements OnInit {
  user$;
  date$;
  data$;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private apollo: Apollo,
              private dateService: DateService) {
  }

  ngOnInit(): void {
    this.date$ = this.dateService.date$;

    this.data$ = this.apollo.watchQuery({
      query: UserQuery,
      // pollInterval: 10000
    }).map(({data}: any) => data.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

  testUpload($event) {
    console.log($event.target.files[0])
  }

  environment() {
    console.log(environment)
  }

  logout() {
    // this.userService.logout()
    // .subscribe(() => this.navCtrl.setRoot('WelcomePage'));
  }

  test() {
    const query = this.apollo.query({query: UserQuery});
    query.subscribe(({data}) => console.log('>>', data))

    // this.navCtrl.setRoot('HomePage')

    // this.dateService.selectDate();

    // const email = 'tester6@colegend.com';
    // const password = 'tester';
    // this.userService.join(email, password).subscribe(console.log, console.error)

    // this.userService.loginWithGoogle()

    // const scope = Scope.DAY;
    // const start = moment().format('YYYY-MM-DD');
    // this.focusService.getFocus$(scope, start)
    //   .subscribe(console.log);

    // this.outcomeService.getOutcomes$(Status.CURRENT, Scope.WEEK).subscribe(console.log)

    // this.experienceService.getExperience$().subscribe(console.log);
    // this.experienceService.getLevel$().subscribe(console.log);
    // this.experienceService.getStatus$().subscribe(console.log);

    // this.store.dispatch(new layout.CloseSidenavAction());

    // this.userService.user$.subscribe(user => {
    //   if (user.duo) {
    //     this.store.dispatch(new community.LoadDuoAction(user.duo));
    //   }
    // })
  }

  updateName() {
    let name = '';
    this.user$.take(1).subscribe(user => name = user.name);

    let prompt = this.alertCtrl.create({
      title: 'Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: name
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
            const newName = data.name;
            if (newName != name) {
              // this.userService.updateUser({name: newName});
            }
          }
        }
      ]
    });
    prompt.present();
  }
}