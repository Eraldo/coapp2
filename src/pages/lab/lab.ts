import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user/user";
import {Deploy} from "@ionic/cloud-angular";
import {LoadingController, ToastController} from "ionic-angular";
import {DateService} from "../../services/date/date";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {environment} from "../../environments/environment";

const UserQuery = gql`
  query me {
    myUser {
      name
      outcomes {
        edges {
          node {
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
  channel = 'production';
  data$;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserService,
              public alertCtrl: AlertController,
              private readonly deploy: Deploy,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private apollo: Apollo,
              private dateService: DateService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.date$ = this.dateService.date$;

    this.data$ = this.apollo.watchQuery({
      query: UserQuery,
      // pollInterval: 10000
    }).map(({data}: any) => data.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

  environment() {
    console.log(environment)
  }

  checkForUpdate() {
    const checking = this.loadingCtrl.create({
      content: 'Checking for update...'
    });
    checking.present();

    this.deploy.channel = this.channel;
    this.deploy.check()
      .then((snapshotAvailable: boolean) => {
        checking.dismiss();
        if (snapshotAvailable) {
          this.downloadAndInstall();
        }
        else {
          const toast = this.toastCtrl.create({
            message: 'No update available',
            duration: 3000
          });
          toast.present();
        }
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: error,
          duration: 3000
        });
        toast.present();
      });
  }

  private downloadAndInstall() {
    const updating = this.loadingCtrl.create({
      content: 'Updating application...'
    });
    updating.present();
    this.deploy.download().then(() => this.deploy.extract()).then(() => this.deploy.load());
  }

  testLogin() {
    const email = 'tester@colegend.com';
    const password = 'tester';
    // this.userService.login(email, password);
    this.apollo.mutate({
      mutation: LoginMutation,
      variables: {
        email: email,
        password: password
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  logout() {
    this.userService.logout()
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
              this.userService.updateUser({name: newName});
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
