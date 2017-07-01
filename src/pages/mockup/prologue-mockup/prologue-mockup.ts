import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";
import {LocationService} from "../../../services/location/location";
import {Observable} from "rxjs/Observable";
import {UserService} from "../../../services/user/user";
import {TypewriterComponent} from "../../../components/typewriter/typewriter";
import {ANONYMOUS_USER} from "../../../models/user";
import {debounce} from "ionic-angular/util/util";
import {Subject} from "rxjs/Subject";

@IonicPage()
@Component({
  selector: 'page-prologue-mockup',
  templateUrl: 'prologue-mockup.html',
})
export class PrologueMockupPage implements OnInit {
  @ViewChild(TypewriterComponent) typewriter;
  @ViewChild(Content) content: Content;

  // country: string;
  country$: Observable<string>;
  weekday$: Observable<string>;
  timeOfDay$: Observable<string>;
  username$;
  actionVisible = false;
  scroller = new Subject();

  constructor(public navCtrl: NavController, public navParams: NavParams, private locationService: LocationService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.country$ = this.locationService.country$;
    // console.log("country: ", this.country);
    this.weekday$ = Observable.of(moment().format('dddd'));
    this.timeOfDay$ = Observable.of(this.getTimeOfDay());
    this.username$ = this.userService.user$.map(user => user.name);
    this.scroller
      .throttleTime(500)
      .do(() => this.content.scrollToBottom())
      .subscribe();
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
    console.log('ionViewDidLoad PrologueMockupPage');
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
    // Check if all observales are ready start the typewriter.
    Observable.zip(this.country$, this.weekday$, this.timeOfDay$, this.username$.filter(username => username != ANONYMOUS_USER.name), (country, weekday, timeOfDay, username) => {
    }).subscribe(() => this.typewriter.start())
  }
}
