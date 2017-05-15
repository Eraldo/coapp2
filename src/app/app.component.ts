import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserService} from "../services/user/user";
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  activePage: any;
  authenticated$: Observable<boolean>;

  appPages: Array<{name: string, component: any, icon?: string, color?: string}>;
  projetPages: Array<{name: string, component: any, icon?: string, color?: string}>;
  adminPages: Array<{name: string, component: any, icon?: string, color?: string}>;
  feedbackPage: {name: string, component: any, icon?: string, color?: string};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private userService: UserService) {
    this.initializeApp();

    this.authenticated$ = userService.authenticated$;

    this.appPages = [
      { name: 'Home', component: 'HomePage', icon: 'home', color: 'area-1'},
      { name: 'Arcade', component: 'ArcadePage', icon: 'game-controller-a', color: 'area-2' },
      { name: 'Office', component: 'OfficePage', icon: 'briefcase', color: 'area-3' },
      { name: 'Community', component: 'CommunityPage', icon: 'people', color: 'area-4' },
      { name: 'Journal', component: 'JournalPage', icon: 'book', color: 'area-5' },
      { name: 'Academy', component: 'AcademyPage', icon: 'school', color: 'area-6' },
      { name: 'Journey', component: 'JourneyPage', icon: 'compass', color: 'area-7' },
    ];
    this.projetPages = [
      // { name: 'About', component: 'AboutPage', icon: 'information-circle', color: 'mid' },
      { name: 'News', component: 'NewsPage', icon: 'paper', color: 'mid' },
      { name: 'Events', component: 'EventsPage', icon: 'calendar', color: 'mid' },
      // { name: 'Project', component: 'ProjectPage', icon: 'infinite', color: 'mid' },
      { name: 'Support', component: 'SupportPage', icon: 'help-circle', color: 'mid' },
      { name: 'Settings', component: 'SettingsPage', icon: 'settings', color: 'mid' },
      // { name: 'Contact', component: 'ContactPage', icon: 'mail', color: 'mid' },
    ];
    this.adminPages = [
      { name: 'Lab', component: 'LabPage', icon: 'flask', color: 'light' },
      { name: 'Backend', component: 'BackendPage', icon: 'nuclear', color: 'light' },
    ];
    this.feedbackPage = { name: 'Feedback', component: 'FeedbackPage', icon: 'paper-plane', color: 'mid' };
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
