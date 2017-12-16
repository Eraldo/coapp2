import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArcadePage } from './arcade';
import {AppToolbarComponentModule} from "../../components/app-toolbar/app-toolbar.module";
import {SuperTabsModule} from "ionic2-super-tabs";

@NgModule({
  declarations: [
    ArcadePage,
  ],
  imports: [
    IonicPageModule.forChild(ArcadePage),
    SuperTabsModule,
    AppToolbarComponentModule
  ]
})
export class ArcadePageModule {}
