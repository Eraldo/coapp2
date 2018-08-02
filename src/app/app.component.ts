import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform, PopoverController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ANONYMOUS_USER} from "../models/user";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Icon} from "../models/icon";
import {UserService} from "../services/user/user";

const ViewerQuery = gql`
  query Viewer {
    viewer {
      id
      name
      avatar
      isSuperuser
    }
    arcadeCheckpoint: hasCheckpoint(name: "arcade tutorial")
    officeCheckpoint: hasCheckpoint(name: "office tutorial")
    communityCheckpoint: hasCheckpoint(name: "community tutorial")
    studioCheckpoint: hasCheckpoint(name: "studio tutorial")
    academyCheckpoint: hasCheckpoint(name: "academy tutorial")
    journeyCheckpoint: hasCheckpoint(name: "journey tutorial")
  }
`;

export interface PageMenuItem {
  name: string,
  region?: string,
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
  icons;
  rootPage: any = 'WelcomePage';
  loading = true;
  user;
  arcadeCheckpoint = false;
  officeCheckpoint = false;
  communityCheckpoint = false;
  studioCheckpoint = false;
  academyCheckpoint = false;
  journeyCheckpoint = false;

  projectPage: PageMenuItem;
  profilePage: PageMenuItem;
  anonymousPages: Array<PageMenuItem>;
  appPages: Array<PageMenuItem>;
  projetPages: Array<PageMenuItem>;
  adminPages: Array<PageMenuItem>;
  feedbackPage: PageMenuItem;

  constructor(public platform: Platform, public userService: UserService, public statusBar: StatusBar, public splashScreen: SplashScreen, private apollo: Apollo, public popoverCtrl: PopoverController, public menuCtrl: MenuController, private hotkeysService: HotkeysService) {
    this.initializeApp();
    this.icons = Icon;

    this.apollo.watchQuery<any>({query: ViewerQuery})
      .valueChanges.subscribe(({data, loading}) => {
      this.loading = loading;
      this.user = data.viewer || ANONYMOUS_USER;

      this.arcadeCheckpoint = data.arcadeCheckpoint;
      this.officeCheckpoint = data.officeCheckpoint;
      this.communityCheckpoint = data.communityCheckpoint;
      this.studioCheckpoint = data.studioCheckpoint;
      this.academyCheckpoint = data.academyCheckpoint;
      this.journeyCheckpoint = data.journeyCheckpoint;
    });

    this.projectPage = {name: 'coLegend', component: 'CoLegendPage', icon: Icon.COLEGEND};
    this.profilePage = {name: 'Profile', component: 'LegendPage', icon: Icon.PROFILE};
    this.anonymousPages = [
      {
        name: 'About',
        region: 'Avalon',
        component: 'AboutPage',
        icon: Icon.ABOUT,
        color: 'area-6',
        shortcut: 'g i',
        description: 'go to About'
      },
      {
        name: 'Welcome',
        region: '',
        component: 'WelcomePage',
        icon: Icon.LOGIN,
        color: 'area-1',
        shortcut: 'g w',
        description: 'go to Welcome'
      },
    ];
    this.appPages = [
      {
        name: 'Village',
        region: 'Avalon',
        component: 'HomePage',
        icon: Icon.HOME,
        color: 'area-1',
        shortcut: 'g h',
        description: 'go to Home'
      },
      {
        name: 'Fair',
        region: 'Shangri-La',
        component: 'ArcadePage',
        icon: Icon.ARCADE,
        color: 'area-2',
        shortcut: 'g a',
        description: 'go to Arcade'
      },
      {
        name: 'Palace',
        region: 'El Dorado',
        component: 'OfficePage',
        icon: Icon.OFFICE,
        color: 'area-3',
        shortcut: 'g o',
        description: 'go to Office'
      },
      {
        name: 'Camp',
        region: 'Arcadia',
        component: 'CommunityPage',
        icon: Icon.COMMUNITY,
        color: 'area-4',
        shortcut: 'g c',
        description: 'go to Community'
      },
      {
        name: 'Studio',
        region: 'Atlantis',
        component: 'StudioPage',
        icon: Icon.STUDIO,
        color: 'area-5',
        shortcut: 'g s',
        description: 'go to Studio'
      },
      {
        name: 'Academy',
        region: 'Olympus',
        component: 'AcademyPage',
        icon: Icon.ACADEMY,
        color: 'area-6',
        shortcut: 'g A',
        description: 'go to Academy'
      },
      {
        name: 'Temple',
        region: 'Bardo',
        component: 'JourneyPage',
        icon: Icon.JOURNEY,
        color: 'area-7',
        shortcut: 'g j',
        description: 'go to Journey'
      },
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
          this.openPage(page);
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
    switch (page.component) {
      case 'AboutPage': {
        window.open('https://www.coLegend.org', '_blank');
        return;
      }
      default: {
        this.navCtrl.setRoot(page.component);
      }
    }
  }

  pushPage(page) {
    switch (page.component) {
      case this.profilePage.component: {
        if (this.user && this.user.id) {
          this.navCtrl.push(page.component, {id: this.user.id});
        }
        return;
      }
      case this.feedbackPage.component: {
        if (!this.user.id) {
          window.open('mailto:connect@coLegend.org', '_blank');
          return;
        }
      }
      default: {
        this.navCtrl.push(page.component);
      }
    }
  }

  checkActive(page) {
    const activePage = this.navCtrl.getActive();
    if (activePage && activePage.name === page.component) {
      return true;
    }
    return;
  }

  hasCheckpoint(page) {
    switch (page.component) {
      case 'HomePage': {
        return true
      }
      case 'ArcadePage': {
        return this.arcadeCheckpoint;
      }
      case 'OfficePage': {
        return this.officeCheckpoint;
      }
      case 'CommunityPage': {
        return this.communityCheckpoint;
      }
      case 'StudioPage': {
        return this.studioCheckpoint;
      }
      case 'AcademyPage': {
        return this.academyCheckpoint;
      }
      case 'JourneyPage': {
        return this.journeyCheckpoint;
      }
      default:
        return true;
    }
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
