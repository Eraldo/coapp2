import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { App } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserService} from "../services/user/user";
import {AngularFireModule} from "angularfire2";
import {firebaseConfig} from "../environments/firebase.config";

import 'rxjs/Rx';
import {MomentModule} from "angular2-moment";
import {ScopeService} from "../services/scope/scope";
import {OutcomeService} from "../services/outcome/outcome";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
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
    UserService,
    ScopeService,
    OutcomeService,
  ],
})
export class AppModule {}
