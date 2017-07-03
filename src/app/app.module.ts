import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {App} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserService} from "../services/user/user";
import {AngularFireModule} from "angularfire2";
import {firebaseConfig} from "../environments/firebase.config";

import 'rxjs/Rx';
import {MomentModule} from "angular2-moment";
import {ScopeService} from "../services/scope/scope";
import {OutcomeService} from "../services/outcome/outcome";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {LocationService} from "../services/location/location";
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {GooglePlus} from "@ionic-native/google-plus";
import {FocusService} from "../services/focus/focus";
import {ExperienceService} from "../services/experience/experience";
import {ApiService} from "../services/api/api";
import { ConfigService } from '../services/config/config';


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
    IonicStorageModule.forRoot(),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    ApiService,
    UserService,
    ScopeService,
    OutcomeService,
    FocusService,
    ExperienceService,
    LocationService,
    // GooglePlus,
    { provide: GooglePlus, useClass: GooglePlusMock },
  ],
})
export class AppModule {
}
