import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ANONYMOUS_USER} from "../../../../models/user";
import {TypewriterComponent} from "../../../../components/typewriter/typewriter";
import {LocationService} from "../../../../services/location/location";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

const ViewerQuery = gql`
  query {
    user: viewer {
      id
      name
      registrationCountry
    }
  }
`;

const UpdateUserLocationMutation = gql`
  mutation UpdateUsername($location: String!) {
    updateUser(input: {registrationCountry: $location}) {
      user {
        id
        registrationCountry
      }
    }
  }
`;


@IonicPage()
@Component({
  selector: 'page-prologue',
  templateUrl: 'prologue.html',
})
export class ProloguePage implements OnInit {
  @ViewChild(TypewriterComponent) typewriter;
  @ViewChild(Content) content: Content;

  loading = true;
  query$;
  country: string;
  weekday: string;
  timeOfDay: string;
  name: string;
  actionVisible = false;
  scroller = new Subject();

  constructor(public navCtrl: NavController, public navParams: NavParams, private apollo: Apollo, private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.query$ = this.apollo.watchQuery<any>({
      query: ViewerQuery
    });
    this.query$.subscribe(({data, loading}) => {
      this.loading = loading;
      if (data.user) {
        const user = data.user;
        this.name = user.name;
        if (!user.registrationCountry) {
          console.log('>>', data.user.registrationCountry);
          this.updateLocation()
        }
        this.country = user.registrationCountry;
      }
    });
    this.weekday = moment().format('dddd');
    this.timeOfDay = this.getTimeOfDay();
    this.scroller
      .throttleTime(1000)
      .do(() => this.content.scrollToBottom(800))
      .subscribe();
  }

  updateLocation() {
    this.locationService.country$.first()
      .subscribe(country => {
        this.apollo.mutate({
          mutation: UpdateUserLocationMutation,
          variables: {
            location: country
          }
        }).subscribe();
      });
  }

  private getTimeOfDay() {
    let hour = moment().hour();
    if (hour > 4 && hour < 12) { // 5-11 (7h)
      return 'morning';
    } else if (hour > 11 && hour < 18) { // 12-17 (6h)
      return 'afternoon';
    } else if (hour > 17 && hour < 23) { // 18-22 (5h)
      return 'evening';
    } else { // 23-4 (6h)
      return 'night';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProloguePage');
  }

  skip() {
    this.typewriter.skip()
  }

  showAction() {
    this.actionVisible = true;
  }

  continue() {
    this.navCtrl.setRoot('JourneyPage');
  }

  scrollToBottom() {
    this.scroller.next();
  }

  ngAfterViewInit() {
    this.query$.filter(({data, loading}) => data.user).subscribe(() => this.typewriter.start());
  }
}
