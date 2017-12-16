import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyPage } from './journey';
import {AppToolbarComponentModule} from "../../components/app-toolbar/app-toolbar.module";
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    JourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyPage),
    SuperTabsModule,
    AppToolbarComponentModule
  ]
})
export class JourneyPageModule {}
