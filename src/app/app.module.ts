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
import {HttpModule} from "@angular/http";
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
    EffectsModule.run(CommunityEffects),
    EffectsModule.run(UsersEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    MomentModule,
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
    ScopeService,
    OutcomeService,
    FocusService,
    ExperienceService,
    LocationService,
    DuoService,
    ClanService,
    TribeService,
    MessageService,
    EmailService,
    // GooglePlus,
    { provide: GooglePlus, useClass: GooglePlusMock },
  ],
})
export class AppModule {
}
