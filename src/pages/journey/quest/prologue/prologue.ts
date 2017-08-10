import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import moment from "moment";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {UserService} from "../../../../services/user/user";
import {ANONYMOUS_USER} from "../../../../models/user";
import {TypewriterComponent} from "../../../../components/typewriter/typewriter";
import {LocationService} from "../../../../services/location/location";

@IonicPage()
@Component({
  selector: 'page-prologue',
  templateUrl: 'prologue.html',
})
export class ProloguePage implements OnInit {
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
    this.country$ = this.userService.user$.map(user => user.registrationCountry);
    // Getting the users country or locating and saving it if not yet set.
    // TODO: Refactoring ugly code. :)
    this.userService.user$
      .filter(user => !user.registrationCountry)
      .subscribe(user =>
        this.locationService.country$.first()
          .subscribe(country =>
            this.userService.updateUser({registrationCountry: country})
          ));
    this.weekday$ = Observable.of(moment().format('dddd'));
    this.timeOfDay$ = Observable.of(this.getTimeOfDay());
    this.username$ = this.userService.user$.map(user => user.name);
    this.scroller
      .throttleTime(1000)
      .do(() => this.content.scrollToBottom(800))
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
    // Check if all observales are ready start the typewriter.
    Observable.zip(this.country$, this.weekday$, this.timeOfDay$, this.username$.filter(username => username != ANONYMOUS_USER.name), (country, weekday, timeOfDay, username) => {
    }).subscribe(() => this.typewriter.start())
  }
}
