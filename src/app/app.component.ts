import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserService} from "../services/user/user";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {UiService} from "../services/ui/ui";

export interface PageMenuItem {
  name: string,
  component: any,
  icon?: string,
  color?: string
}

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'WelcomePage';
  activePage: any;
  authenticated$: Observable<boolean>;
  user$: Observable<User>;
  showMenu$: Observable<boolean>;

  projectPage: PageMenuItem;
  profilePage: PageMenuItem;
  appPages: Array<PageMenuItem>;
  projetPages: Array<PageMenuItem>;
  adminPages: Array<PageMenuItem>;
  feedbackPage: PageMenuItem;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private userService: UserService, private uiService: UiService) {
    this.initializeApp();

    this.showMenu$ = this.uiService.showMenu$;
    this.authenticated$ = userService.authenticated$;
    this.user$ = userService.user$;

    this.projectPage = {name: 'Colegend', component: 'ColegendPage', icon: 'infinite'};
    this.profilePage = {name: 'Profile', component: 'LegendPage', icon: 'fingerprint'};
    this.appPages = [
      {name: 'Home', component: 'HomePage', icon: 'home', color: 'area-1'},
      {name: 'Arcade', component: 'ArcadePage', icon: 'game-controller-a', color: 'area-2'},
      {name: 'Office', component: 'OfficePage', icon: 'briefcase', color: 'area-3'},
      {name: 'Community', component: 'CommunityPage', icon: 'bonfire', color: 'area-4'},
      {name: 'Studio', component: 'StudioPage', icon: 'microphone', color: 'area-5'},
      {name: 'Academy', component: 'AcademyPage', icon: 'school', color: 'area-6'},
      {name: 'Journey', component: 'JourneyPage', icon: 'compass', color: 'area-7'},
    ];
    this.projetPages = [
      {name: 'News', component: 'NewsPage', icon: 'paper', color: 'mid'},
      {name: 'Events', component: 'EventsPage', icon: 'calendar', color: 'mid'},
      {name: 'Support', component: 'SupportPage', icon: 'help-circle', color: 'mid'},
      {name: 'Settings', component: 'SettingsPage', icon: 'settings', color: 'mid'},
    ];
    this.adminPages = [
      {name: 'Lab', component: 'LabPage', icon: 'flask', color: 'light'},
      {name: 'Mockup', component: 'MockupPage', icon: 'images', color: 'light'},
      {name: 'Backend', component: 'BackendPage', icon: 'nuclear', color: 'light'},
    ];
    this.feedbackPage = {name: 'Feedback', component: 'FeedbackPage', icon: 'paper-plane'};
    this.activePage = this.appPages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  pushPage(page) {
    this.nav.push(page.component);
  }

  checkActive(page) {
    return page == this.activePage;
  }
}
