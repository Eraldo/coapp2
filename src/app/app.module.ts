import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {App} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import 'rxjs/Rx';
import {MomentModule} from "angular2-moment";
import {ScopeService} from "../services/scope/scope";
import {LocationService} from "../services/location/location";
import {HttpModule} from "@angular/http";
import {GooglePlus} from "@ionic-native/google-plus";
import {UiService} from "../services/ui/ui";
import {SIMPLEMDE_CONFIG, SimplemdeModule} from "ng2-simplemde/no-style";
import {MarkdownModule, MarkdownService} from "ngx-md";
import {DatePicker, DatePickerOptions} from "@ionic-native/date-picker";
import ApolloClient from "apollo-client/ApolloClient";
import {createBatchingNetworkInterface} from "apollo-client";
import {ApolloModule} from "apollo-angular";
import {environment} from "../environments/environment";
import { SessionsService } from '../services/sessions/sessions';
import {HotkeyModule} from "angular2-hotkeys";
import {SuperTabsModule} from "ionic2-super-tabs";
import {DateService} from "../services/date/date";

// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const networkInterface = createBatchingNetworkInterface({ uri: `${environment.api}graphql/batch` });

networkInterface.use([{
  applyBatchMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      req.options.headers.authorization = token;
    }
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});

export function provideClient(): ApolloClient {
  return client;
}


export class GooglePlusMock extends GooglePlus {
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

export class DatePickerMock extends DatePicker {
  show(options: DatePickerOptions): Promise<Date> {
    return new Promise((resolve, reject) => {
      reject('TODO: Implementing google plus web.');
    })
  }
}

export function simplemdeValue() {
  return {
    // toolbar: [
    //   'bold',
    //   'italic',
    //   'heading',
    //   'quote',
    //   'unordered-list',
    //   'ordered-list',
    //   '|',
    //   'image',
    //   'link',
    //   'preview',
    // ],
    // status: false
  }
}

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    HttpModule,
    // StoreModule.provideStore(reducer),
    // StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ApolloModule.forRoot(provideClient),
    MomentModule,
    MarkdownModule.forRoot(),
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      // config options 1
      useValue: simplemdeValue()
    }),
    SuperTabsModule.forRoot(),
    HotkeyModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UiService,
    DateService,
    ScopeService,
    SessionsService,
    LocationService,
    MarkdownService,
    DatePicker,
    // GooglePlus,
    { provide: GooglePlus, useClass: GooglePlusMock },
    // { provide: DatePicker, useClass: DatePickerMock },
  ],
})
export class AppModule {
}
