import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform, PopoverController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {User} from "../models/user";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Icon} from "../models/icon";

const ViewerQuery = gql`
  query Viewer {
    viewer {
      id
      name
      avatar
      isSuperuser
    }
  }
`;

export interface PageMenuItem {
  name: string,
  component: any,
  icon?: string,
  color?: string,
  shortcut?: string,
  description?: string
}

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild('nav') navCtrl: NavController;

  rootPage: any = 'WelcomePage';
  user: User;
  loading = true;

  projectPage: PageMenuItem;
  profilePage: PageMenuItem;
  appPages: Array<PageMenuItem>;
  projetPages: Array<PageMenuItem>;
  adminPages: Array<PageMenuItem>;
  feedbackPage: PageMenuItem;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private apollo: Apollo, public popoverCtrl: PopoverController, public menuCtrl: MenuController, private hotkeysService: HotkeysService) {
    this.initializeApp();

    this.apollo.watchQuery<any>({query: ViewerQuery})
      .subscribe(({data, loading}) => {
        this.user = data.viewer;
        this.loading = loading;
      });

    this.projectPage = {name: 'Colegend', component: 'ColegendPage', icon: 'infinite'};
    this.profilePage = {name: 'Profile', component: 'LegendPage', icon: 'fingerprint'};
    this.appPages = [
      {name: 'Home', component: 'HomePage', icon: Icon.HOME, color: 'area-1', shortcut: 'g h', description: 'go to Home'},
      {name: 'Arcade', component: 'ArcadePage', icon: Icon.ARCADE, color: 'area-2', shortcut: 'g a', description: 'go to Arcade'},
      {name: 'Office', component: 'OfficePage', icon: Icon.OFFICE, color: 'area-3', shortcut: 'g o', description: 'go to Office'},
      {name: 'Community', component: 'CommunityPage', icon: Icon.COMMUNITY, color: 'area-4', shortcut: 'g c', description: 'go to Community'},
      {name: 'Studio', component: 'StudioPage', icon: Icon.STUDIO, color: 'area-5', shortcut: 'g s', description: 'go to Studio'},
      {name: 'Academy', component: 'AcademyPage', icon: Icon.ACADEMY, color: 'area-6', shortcut: 'g A', description: 'go to Academy'},
      {name: 'Journey', component: 'JourneyPage', icon: Icon.JOURNEY, color: 'area-7', shortcut: 'g j', description: 'go to Journey'},
    ];
    this.projetPages = [
      {name: 'News', component: 'NewsPage', icon: Icon.NEWS, color: 'mid'},
      {name: 'Events', component: 'EventsPage', icon: Icon.EVENTS, color: 'mid'},
      {name: 'Support', component: 'SupportPage', icon: Icon.SUPPORT, color: 'mid'},
      {name: 'Settings', component: 'SettingsPage', icon: Icon.SETTINGS, color: 'mid'},
    ];
    this.adminPages = [
      {name: 'Backstage', component: 'BackendPage', icon: Icon.BACKSTAGE, color: 'light'},
    ];
    this.feedbackPage = {name: 'Feedback', component: 'FeedbackPage', icon: Icon.FEEDBACK};

    // Keyboard shortcuts
    for (let page of this.appPages) {
      if (page.shortcut) {
        this.hotkeysService.add(new Hotkey(page.shortcut, (event: KeyboardEvent): boolean => {
          this.navCtrl.push(page.component);
          return false; // Prevent bubbling
        }, [], page.description || ''));
      }
    }
    this.hotkeysService.add(new Hotkey('q a', (event: KeyboardEvent): boolean => {
      this.quickadd(event);
      return false; // Prevent bubbling
    }, [], 'quick add menu'));
    // this.hotkeysService.add(new Hotkey('esc', (event: KeyboardEvent): boolean => {
    //   document.getElementById(document.activeElement.id).blur();
    //   return false; // Prevent bubbling
    // }, ['INPUT', 'SELECT', 'TEXTAREA'], 'defocus active element'));
  }

  goHome(event: KeyboardEvent) {
    console.log('Typed hotkey');
    this.navCtrl.push('HomePage');
    return false; // Prevent bubbling
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
    this.navCtrl.setRoot(page.component);
  }

  pushPage(page) {
    this.navCtrl.push(page.component);
  }

  checkActive(page) {
    const activePage = this.navCtrl.getActive();
    if (activePage && activePage.name === page.component) {
      return true;
    }
    return;
  }

  quickadd(event) {
    event.stopPropagation();
    let popover = this.popoverCtrl.create('QuickaddOptionsPage');
    popover.present({
      ev: event
    });
    popover.onDidDismiss(() => this.menuCtrl.close())
  }
}
