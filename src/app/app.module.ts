import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';

import {App} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserService} from "../services/user/user";
// import {AngularFireModule} from "angularfire2";
// import {firebaseConfig} from "../environments/firebase.config";

import 'rxjs/Rx';
import {MomentModule} from "angular2-moment";
import {ScopeService} from "../services/scope/scope";
import {OutcomeService} from "../services/outcome/outcome";
// import {AngularFireAuthModule} from "angularfire2/auth";
// import {AngularFireDatabaseModule} from "angularfire2/database";
import {LocationService} from "../services/location/location";
import {Http, HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {GooglePlus} from "@ionic-native/google-plus";
import {FocusService} from "../services/focus/focus";
import {ExperienceService} from "../services/experience/experience";
import {ApiService} from "../services/api/api";
import { ConfigService } from '../services/config/config';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {DuoService} from "../services/duo/duo";
import {EmailService} from "../services/email/email";
import {MessageService} from "../services/message/message";
import {ClanService} from "../services/clan/clan";
import {TribeService} from "../services/tribe/tribe";

import {StoreModule} from "@ngrx/store";
import {reducer} from "../store/reducers/index";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {UiService} from "../services/ui/ui";
import {EffectsModule} from "@ngrx/effects";
import {CommunityEffects} from "../store/effects/community";
import {UsersEffects} from "../store/effects/users";
import {OfficeEffects} from "../store/effects/office";
import {OutcomeDataService} from "../services/outcome/outcome-data";
import {DuoDataService} from "../services/duo/duo-data";
import {UserDataService} from "../services/user/user-data";
import {FocusDataService} from "../services/focus/focus-data";
import {DateService} from "../services/date/date";
import {ExperienceDataService} from "../services/experience/experience-data";
import {ExperienceEffects} from "../store/effects/experience";
import {StudioEffects} from "../store/effects/studio";
import {JournalService} from "../services/journal/journal";
import {JournalEntryDataService} from "../services/journal/journal-data";
import {SIMPLEMDE_CONFIG, SimplemdeModule} from "ng2-simplemde/no-style";
import {MarkdownModule, MarkdownService} from "angular2-markdown";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'dd8b3ece'
  },

};

class GooglePlusMock extends GooglePlus {
  login(options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('TODO: Implementing google plus web.');
    })
  }

  trySilentLogin(options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('TODO: Implementing google plus web.');
    })
  }

  logout(options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('TODO: Implementing google plus web.');
    })
  }
}

export function simplemdeValue() {
  return {
    toolbar: [
      'bold',
      'italic',
      'heading',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'image',
      'link',
      'preview',
    ],
    status: false
  }
}

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    HttpModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(UsersEffects),
    EffectsModule.run(ExperienceEffects),
    EffectsModule.run(CommunityEffects),
    EffectsModule.run(OfficeEffects),
    EffectsModule.run(StudioEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    MomentModule,
    MarkdownModule.forRoot(),
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      // config options 1
      useValue: {
        placeholder: 'placeholder'
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigService,
    UiService,
    ApiService,
    UserService,
    UserDataService,
    ScopeService,
    DateService,
    OutcomeService,
    OutcomeDataService,
    FocusService,
    FocusDataService,
    JournalService,
    JournalEntryDataService,
    ExperienceService,
    ExperienceDataService,
    LocationService,
    DuoService,
    DuoDataService,
    ClanService,
    TribeService,
    MessageService,
    EmailService,
    MarkdownService,
    // GooglePlus,
    { provide: GooglePlus, useClass: GooglePlusMock },
  ],
})
export class AppModule {
}
