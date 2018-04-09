import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {App} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import 'rxjs/Rx';
import {MomentModule} from "angular2-moment";
import {ScopeService} from "../services/scope/scope";
import {LocationService} from "../services/location/location";
import {GooglePlus} from "@ionic-native/google-plus";
import {UiService} from "../services/ui/ui";
import {SIMPLEMDE_CONFIG, SimplemdeModule} from "ng2-simplemde/no-style";
import {DatePicker, DatePickerOptions} from "@ionic-native/date-picker";
import {Apollo, ApolloModule} from "apollo-angular";
import {environment} from "../environments/environment";
import {SessionsService} from '../services/sessions/sessions';
import {HotkeyModule} from "angular2-hotkeys";
import {SuperTabsModule} from "ionic2-super-tabs";
import {DateService} from "../services/date/date";
import {IconService} from "../services/icon/icon";
import {InMemoryCache} from "apollo-cache-inmemory";
import {setContext} from "apollo-link-context";
import {HttpClientModule} from "@angular/common/http";
import {BatchHttpLink} from "apollo-link-batch-http";
import {ApolloLink} from "apollo-link";
import {createUploadLink} from 'apollo-upload-client'
import {MarkdownModule, MarkdownService, MarkedOptions} from "ngx-markdown";
import {simplemdeFactory} from "../utils/simplemde";
import {markedOptionsFactory} from "../utils/markdown";
import {EmbedVideo, EmbedVideoService} from "ngx-embed-video";

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

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    HttpClientModule,
    ApolloModule,
    MomentModule,
    EmbedVideo.forRoot(),
    MarkdownModule.forRoot({
      provide: MarkedOptions,
      useFactory: markedOptionsFactory,
      deps: [EmbedVideoService, DomSanitizer],
    }),
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      useFactory: simplemdeFactory,
      deps: [MarkdownService],
    }),
    SuperTabsModule.forRoot(),
    HotkeyModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IconService,
    UiService,
    DateService,
    ScopeService,
    SessionsService,
    LocationService,
    MarkdownService,
    DatePicker,
    // GooglePlus,
    {provide: GooglePlus, useClass: GooglePlusMock},
    // { provide: DatePicker, useClass: DatePickerMock },
  ],
})
export class AppModule {
  constructor(apollo: Apollo) {

    // https://github.com/jaydenseric/apollo-upload-client/issues/34#issuecomment-372679857
    const isObject = node => typeof node === 'object' && node !== null;

    // rough first draft, could probably be optimised in a loads of different ways.
    const hasFiles = (node, found = []) => {
      Object.keys(node).forEach((key) => {
        if (!isObject(node[key]) || found.length > 0) {
          return;
        }

        if (
          (typeof File !== 'undefined' && node[key] instanceof File) ||
          (typeof Blob !== 'undefined' && node[key] instanceof Blob)
        ) {
          found.push(node[key]);
          return;
        }

        hasFiles(node[key], found);
      });

      return found.length > 0;
    };

    const options = {
      uri: `${environment.api}graphql/batch`
    };

    const httpLink = ApolloLink.split(
      ({variables}) => hasFiles(variables),
      createUploadLink(options),
      new BatchHttpLink(options),
    );

    const middleware = setContext(() => ({
      headers: {'Authorization': localStorage.getItem('token')}
    }));

    const link = middleware.concat(httpLink);

    apollo.create({
      link,
      cache: new InMemoryCache(),
      // ssrMode: true,
      // ssrForceFetchDelay: 100,
      // connectToDevTools: true,
      // queryDeduplication: true,
    });
  }
}
