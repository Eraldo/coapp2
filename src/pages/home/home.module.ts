import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { HomePage } from './home';
import {AppToolbarComponentModule} from "../../components/app-toolbar/app-toolbar.module";
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SuperTabsModule,
    AppToolbarComponentModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
